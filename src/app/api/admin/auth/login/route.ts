import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyCredentials } from "@/lib/server/auth";
import { apiError, enforceRateLimit, isSameOrigin, normalizeEmail, readJson, requestIp, sha256 } from "@/lib/server/security";
import { emailSchema } from "@/lib/server/validation";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!process.env.MONGODB_URI || !process.env.ADMIN_EMAIL) return NextResponse.json({ error: "The publishing service is not configured." }, { status: 503 });

  try {
    const ip = requestIp(request);
    if (!(await enforceRateLimit("login-ip", sha256(ip), 12, 15 * 60_000))) {
      return NextResponse.json({ error: "Too many attempts. Please wait 15 minutes." }, { status: 429 });
    }
    const body = await readJson(request);
    const parsedEmail = emailSchema.safeParse(body.email);
    const password = typeof body.password === "string" ? body.password : "";
    if (!parsedEmail.success || !password || password.length > 128) {
      return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
    }
    const email = normalizeEmail(parsedEmail.data);
    if (!(await enforceRateLimit("login-account", sha256(email), 8, 15 * 60_000))) {
      return NextResponse.json({ error: "Too many attempts. Please wait 15 minutes." }, { status: 429 });
    }
    const admin = await verifyCredentials(email, password);
    if (!admin) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    await createSession(admin, { ip, userAgent: request.headers.get("user-agent")?.slice(0, 300) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "The publishing service is temporarily unavailable.");
  }
}
