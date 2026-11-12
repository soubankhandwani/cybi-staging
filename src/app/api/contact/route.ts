import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contactLimits, enquiryTypes } from "@/lib/contact";
import { sendMail } from "@/lib/server/mail";
import { apiError, enforceRateLimit, isSameOrigin, readJson, requestIp, sha256 } from "@/lib/server/security";
import { emailSchema } from "@/lib/server/validation";

const schema = z.object({
  name: z.string().trim().min(2).max(contactLimits.name),
  organisation: z.string().trim().max(contactLimits.organisation).optional(),
  email: emailSchema,
  phone: z.string().trim().max(contactLimits.phone).optional(),
  enquiryType: z.enum(enquiryTypes),
  message: z.string().trim().min(20).max(contactLimits.message),
});

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    const body = await readJson(request, 40_000);
    if (body.website) return NextResponse.json({ ok: true });
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Check your name, organisation, email, contact number, service and message." }, { status: 400 });
    const to = process.env.CONTACT_TO?.trim();
    if (!to) return NextResponse.json({ error: "The enquiry form is temporarily unavailable." }, { status: 503 });
    const ip = requestIp(request);
    if (!(await enforceRateLimit("contact", sha256(ip), ip === "unknown" ? 60 : 8, 60 * 60_000))) {
      return NextResponse.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
    }
    const { name, organisation, email, phone, enquiryType, message } = parsed.data;
    await sendMail({
      to,
      replyTo: email,
      subject: "Website enquiry — " + enquiryType,
      text: ["Name: " + name, "Organisation: " + (organisation || "Not provided"), "Email: " + email, "Phone: " + (phone || "Not provided"), "", message].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "Your enquiry could not be sent. Please try again.");
  }
}