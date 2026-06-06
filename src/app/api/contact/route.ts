import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, phone, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Namaste Yoga Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO ?? "namasteyogaohio@gmail.com",
    replyTo: email,
    subject: subject ? `[Contact] ${subject}` : `[Contact] Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\n\n${message}`,
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
