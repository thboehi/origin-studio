import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

const SECRET = process.env.FORM_SECRET || "change-this-in-production";
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 3; // Max 3 submissions per window (plus strict pour les avis)
const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1465388648399900898/37Io_pskliWkSIKQqfq4zNW-v8XBfVjV2AUHnhhbpBzECkq77L69sxvdiYpZAg_8s5mh";

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
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "";
  
  return crypto
    .createHash("sha256")
    .update(`${ip}-${userAgent}`)
    .digest("hex");
}

function createMailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.infomaniak.com",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

async function sendDiscordWebhook(data: {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  rating: number;
  text: string;
  imageUrl?: string;
}) {
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
  const ratingColor = data.rating >= 4 ? 0x5F10DC : data.rating >= 3 ? 0x8B5CF6 : 0x6B7280;
  
  const embed = {
    embeds: [
      {
        color: ratingColor,
        author: {
          name: `${data.firstName} ${data.lastName}`,
          icon_url: data.imageUrl || undefined,
        },
        fields: [
          {
            name: " ",
            value: `${stars}\n\n${data.text.substring(0, 2048)}`,
          },
          {
            name: "Contact",
            value: data.email,
            inline: true,
          },
          ...(data.company ? [
            {
              name: "Entreprise",
              value: data.company,
              inline: true,
            },
          ] : []),
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(embed),
    });

    if (!response.ok) {
      console.error("Discord webhook failed:", await response.text());
    }
  } catch (error) {
    console.error("Failed to send Discord webhook:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const rating = parseInt(formData.get("rating") as string, 10);
    const text = formData.get("text") as string;
    const nonce = formData.get("nonce") as string;
    const honeypot = formData.get("website_url") as string;
    const image = formData.get("image") as File | null;

    // 1. Check honeypot
    if (honeypot) {
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
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !text?.trim() || !rating) {
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

    // 6. Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 422 }
      );
    }

    // 7. Validate text length
    if (text.trim().length < 20 || text.trim().length > 5000) {
      return NextResponse.json(
        { message: "Review text must be between 20 and 5000 characters" },
        { status: 422 }
      );
    }

    // 8. Handle image upload
    let imagePath: string | undefined;
    let imageUrl: string | undefined;
    
    if (image && image.size > 0) {
      // Validate image size
      if (image.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { message: "Image size must not exceed 20MB" },
          { status: 422 }
        );
      }

      // Validate image type
      if (!image.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "Only images are accepted" },
          { status: 422 }
        );
      }

      // Generate UUID for filename
      const uuid = uuidv4();
      const extension = image.name.split(".").pop() || "jpg";
      const filename = `${uuid}.${extension}`;
      
      // Save image
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const publicPath = join(process.cwd(), "public", "uploads", filename);
      await writeFile(publicPath, buffer);
      
      imagePath = `/api/uploads/${filename}`;
      imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://origin-studio.ch"}${imagePath}`;
    }

    // 9. Send emails
    try {
      const transporter = createMailTransporter();
      
      const fromName = process.env.SMTP_FROM_NAME || "Origin Studio";
      const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
      
      const stars = "⭐".repeat(rating);

      // Email de confirmation au client
      const mailOptionsToClient = {
        from: `"${fromName}" <${fromEmail}>`,
        to: email.trim(),
        subject: `Merci pour votre avis - Origin Studio`,
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
            <div style="background-color: #121212; border-bottom: 1px solid #1f1f1f;">
              <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
                <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 600;">
                  ✓ Avis bien reçu !
                </h2>
              </div>
            </div>
            
            <div style="background-color: #0a0a0a;">
              <div style="max-width: 600px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e5e5e5;">
                <p style="color: #ffffff; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                  Bonjour <strong>${firstName} ${lastName}</strong>,
                </p>
                
                <p style="color: #e5e5e5; line-height: 1.6; margin: 0 0 24px 0; font-size: 14px;">
                  Merci infiniment d'avoir pris le temps de partager votre expérience avec Origin Studio ! Votre avis est précieux et nous aide à nous améliorer continuellement.
                </p>
                
                <div style="background-color: #121212; padding: 16px; border-radius: 4px; margin-bottom: 24px; border-left: 2px solid #333;">
                  <p style="margin: 0 0 12px 0; color: #a0a0a0; font-size: 13px;">Récapitulatif de votre avis</p>
                  <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 15px;">${stars} (${rating}/5)</p>
                  <p style="color: #e5e5e5; line-height: 1.6; white-space: pre-wrap; margin: 0; font-size: 14px;">${text.trim()}</p>
                </div>
                
                ${imagePath ? `
                <div style="text-align: center; margin-bottom: 24px;">
                  <img src="${imageUrl}" alt="Votre photo" style="max-width: 300px; border-radius: 8px; border: 1px solid #333;" />
                </div>
                ` : ""}
                
                <p style="color: #e5e5e5; line-height: 1.6; margin: 0 0 20px 0; font-size: 14px;">
                  Nous examinerons votre retour avec attention. Si vous avez des questions ou souhaitez discuter davantage, n'hésitez pas à nous contacter.
                </p>
                
                <div style="margin-top: 24px; text-align: center;">
                  <a href="https://origin-studio.ch/contact" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 14px; margin: 4px; border: 1px solid #333;">
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
            
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
Bonjour ${firstName} ${lastName},

Merci infiniment d'avoir pris le temps de partager votre expérience avec Origin Studio !

Récapitulatif de votre avis :
Note : ${stars} (${rating}/5)
${text.trim()}

Nous examinerons votre retour avec attention. Si vous avez des questions ou souhaitez discuter davantage, n'hésitez pas à nous contacter.

---
© ${new Date().getFullYear()} Origin Studio - Agence web suisse
Genève, Suisse 🇨🇭
        `,
      };

      await transporter.sendMail(mailOptionsToClient);

      console.log("Review confirmation email sent:", {
        timestamp: new Date().toISOString(),
        clientHash: identifier,
        to: email.trim(),
        rating,
      });

    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Continue anyway - we still want to send the Discord notification
    }

    // 10. Send Discord webhook
    await sendDiscordWebhook({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      company: company?.trim(),
      email: email.trim(),
      rating,
      text: text.trim(),
      imageUrl,
    });

    return NextResponse.json(
      { 
        message: "Review submitted successfully",
        imagePath 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Review form error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
