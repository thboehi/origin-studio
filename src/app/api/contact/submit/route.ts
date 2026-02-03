import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

const SECRET = process.env.FORM_SECRET || "change-this-in-production";
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // Max 5 submissions per window

// In-memory rate limiting (for production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function verifyNonce(nonce: string): boolean {
  try {
    const [timestamp, signature] = nonce.split(".");
    if (!timestamp || !signature) return false;

    const ts = parseInt(timestamp, 10);
    if (isNaN(ts)) return false;

    // Check if nonce is not too old (valid for 1 hour)
    const age = Date.now() - ts;
    if (age > 3600000) return false;

    // Verify signature
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(timestamp);
    const expectedSignature = hmac.digest("hex");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}

function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

function getClientIdentifier(request: NextRequest): string {
  // Use IP + User-Agent for identification
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "";
  
  return crypto
    .createHash("sha256")
    .update(`${ip}-${userAgent}`)
    .digest("hex");
}

function createMailTransporter() {
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: port,
    secure: port === 465, // true pour 465 (SSL/TLS), false pour 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, nonce, website_url } = body;

    // 1. Check honeypot
    if (website_url) {
      return NextResponse.json(
        { message: "Invalid submission" },
        { status: 422 }
      );
    }

    // 2. Verify nonce
    if (!nonce || !verifyNonce(nonce)) {
      return NextResponse.json(
        { message: "Invalid security token" },
        { status: 422 }
      );
    }

    // 3. Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimit = checkRateLimit(identifier);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: "Too many requests" },
        { 
          status: 429,
          headers: {
            "Retry-After": rateLimit.retryAfter?.toString() || "900",
          },
        }
      );
    }

    // 4. Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 422 }
      );
    }

    // 5. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 422 }
      );
    }

    // 6. Validate message length
    if (message.trim().length < 10 || message.trim().length > 5000) {
      return NextResponse.json(
        { message: "Message must be between 10 and 5000 characters" },
        { status: 422 }
      );
    }

    // 7. Send email via SMTP
    try {
      const transporter = createMailTransporter();
      
      const fromName = process.env.SMTP_FROM_NAME || "Origin Studio";
      const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
      
      // Email pour nous (notification)
      const mailOptionsToUs = {
        from: `"${fromName}" <${fromEmail}>`,
        to: process.env.SMTP_TO || process.env.SMTP_USER,
        replyTo: email.trim(),
        subject: `Nouveau message de ${name.trim()} via le site Origin Studio`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="color-scheme" content="dark">
            <meta name="supported-color-schemes" content="dark">
            <style>
              :root {
                color-scheme: dark;
                supported-color-schemes: dark;
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0a;">
            <!-- Header full width -->
            <div style="background-color: #121212; border-bottom: 1px solid #1f1f1f;">
              <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
                <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 600;">
                  Nouveau message de contact
                </h2>
              </div>
            </div>
            
            <!-- Content full width -->
            <div style="background-color: #0a0a0a;">
              <div style="max-width: 600px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e5e5e5;">
                <div style="background-color: #121212; padding: 16px; border-radius: 4px; margin-bottom: 16px; border-left: 2px solid #333;">
                  <p style="margin: 0 0 8px 0; color: #a0a0a0; font-size: 13px;">De la part de</p>
                  <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 15px; font-weight: 500;">${name.trim()}</p>
                  <p style="margin: 0 0 4px 0; color: #a0a0a0; font-size: 13px;">Email</p>
                  <p style="margin: 0 0 12px 0;"><a href="mailto:${email.trim()}" style="color: #ffffff; text-decoration: none;">${email.trim()}</a></p>
                  ${phone?.trim() ? `<p style="margin: 0 0 4px 0; color: #a0a0a0; font-size: 13px;">Téléphone</p><p style="margin: 0; color: #ffffff;">${phone.trim()}</p>` : ''}
                </div>
                
                <div style="background-color: #121212; padding: 16px; border-radius: 4px; border-left: 2px solid #333;">
                  <p style="margin: 0 0 12px 0; color: #a0a0a0; font-size: 13px;">Message</p>
                  <p style="color: #e5e5e5; line-height: 1.6; white-space: pre-wrap; margin: 0; font-size: 14px;">${message.trim()}</p>
                </div>
                
                <div style="margin-top: 20px; padding: 12px; background-color: #121212; border-radius: 4px; text-align: center;">
                  <p style="color: #666; margin: 0; font-size: 13px;">
                    💡 Pour répondre au client, réponds simplement à ce mail.
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Footer full width -->
            <div style="background-color: #0a0a0a; border-top: 1px solid #1f1f1f;">
              <div style="max-width: 600px; margin: 0 auto; padding: 16px; text-align: center; font-size: 11px; color: #555;">
                <p style="margin: 0 0 4px 0;">${new Date().toLocaleString('fr-CH', { timeZone: 'Europe/Zurich' })}</p>
                <p style="margin: 0; color: #444;">ID: ${identifier.substring(0, 8)}</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Nouveau message de contact

Nom: ${name.trim()}
Email: ${email.trim()}
${phone?.trim() ? `Téléphone: ${phone.trim()}` : ''}

Message:
${message.trim()}

---
Envoyé le ${new Date().toLocaleString('fr-CH', { timeZone: 'Europe/Zurich' })}
Répondre à: ${email.trim()}
        `,
      };

      // Email de confirmation au client
      const mailOptionsToClient = {
        from: `"${fromName}" <${fromEmail}>`,
        to: email.trim(),
        subject: `Confirmation de réception - Origin Studio`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="color-scheme" content="dark">
            <meta name="supported-color-schemes" content="dark">
            <style>
              :root {
                color-scheme: dark;
                supported-color-schemes: dark;
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0a;">
            <!-- Header full width -->
            <div style="background-color: #121212; border-bottom: 1px solid #1f1f1f;">
              <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
                <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 600;">
                  ✓ Message bien reçu
                </h2>
              </div>
            </div>
            
            <!-- Content full width -->
            <div style="background-color: #0a0a0a;">
              <div style="max-width: 600px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e5e5e5;">
                <p style="color: #ffffff; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                  Bonjour <strong>${name.trim()}</strong>,
                </p>
                
                <p style="color: #e5e5e5; line-height: 1.6; margin: 0 0 24px 0; font-size: 14px;">
                  Merci de nous avoir contactés ! Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.
                </p>
                
                <div style="background-color: #121212; padding: 16px; border-radius: 4px; margin-bottom: 24px; border-left: 2px solid #333;">
                  <p style="margin: 0 0 12px 0; color: #a0a0a0; font-size: 13px;">Votre message</p>
                  <p style="color: #e5e5e5; line-height: 1.6; white-space: pre-wrap; margin: 0; font-size: 14px;">${message.trim()}</p>
                </div>
                
                <p style="color: #e5e5e5; line-height: 1.6; margin: 0 0 20px 0; font-size: 14px;">
                  En attendant notre réponse, n'hésitez pas à consulter notre site ou à nous rejoindre sur Discord.
                </p>
                
                <div style="margin-top: 24px; text-align: center;">
                  <a href="https://origin-studio.ch" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 14px; margin: 4px; border: 1px solid #333;">
                    Visiter notre site
                  </a>
                  <a href="https://discord.gg/6khXbmbJF9" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 14px; margin: 4px; border: 1px solid #333;">
                    Rejoindre Discord
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Footer full width -->
            <div style="background-color: #0a0a0a; border-top: 1px solid #1f1f1f;">
              <div style="max-width: 600px; margin: 0 auto; padding: 16px; text-align: center; font-size: 11px; color: #555;">
                <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} Origin Studio - Agence web suisse</p>
                <p style="margin: 0; color: #444;">Genève, Suisse 🇨🇭</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Bonjour ${name.trim()},

Merci de nous avoir contactés ! Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.

Récapitulatif de votre message :
${message.trim()}

En attendant notre réponse, n'hésitez pas à consulter notre site web (https://origin-studio.ch) ou à nous rejoindre sur notre Discord (https://discord.gg/6khXbmbJF9).

---
© ${new Date().getFullYear()} Origin Studio - Agence web suisse
Genève, Suisse 🇨🇭
        `,
      };

      // Envoyer les deux emails
      await Promise.all([
        transporter.sendMail(mailOptionsToUs),
        transporter.sendMail(mailOptionsToClient)
      ]);

      console.log("Emails sent successfully:", {
        timestamp: new Date().toISOString(),
        clientHash: identifier,
        to: mailOptionsToUs.to,
        from: email.trim(),
        confirmation: true,
      });

      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      return NextResponse.json(
        { message: "Failed to send message" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
