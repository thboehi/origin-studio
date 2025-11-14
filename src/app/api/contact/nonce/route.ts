import { NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.FORM_SECRET || "change-this-in-production";

export async function GET() {
  try {
    // Generate a nonce with timestamp
    const timestamp = Date.now();
    const data = `${timestamp}`;
    
    // Create HMAC signature
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(data);
    const signature = hmac.digest("hex");
    
    // Combine timestamp and signature
    const nonce = `${timestamp}.${signature}`;
    
    return NextResponse.json({ nonce });
  } catch {
    return NextResponse.json({ error: "Failed to generate nonce" }, { status: 500 });
  }
}
