import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_TO ?? "namasteyogaohio@gmail.com";

export async function POST(req: Request) {
  const { name, email, phone, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  await resend.emails.send({
    from: "Namaste Yoga Website <hello@namasteyogaohio.com>",
    to: TO,
    replyTo: email,
    subject: subject ? `[Contact] ${subject}` : `[Contact] Message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;color:#333">
        <h2 style="color:#5a7a62;margin-bottom:4px">New message from the Namaste website</h2>
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
