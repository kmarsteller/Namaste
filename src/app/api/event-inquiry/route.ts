import { NextResponse } from "next/server";

// Resend is disabled until domain is verified and RESEND_API_KEY is set in Vercel.
// Uncomment the block below and remove the stub return to activate.
//
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);
// const TO = process.env.CONTACT_TO ?? "namasteyogaohio@gmail.com";
//
// await resend.emails.send({
//   from: "Namaste Yoga Website <hello@namasteyogaohio.com>",
//   to: TO,
//   replyTo: email,
//   subject: `[Event Inquiry] ${sessionType} — ${fullName}`,
//   html: `
//     <div style="font-family:sans-serif;max-width:560px;color:#333">
//       <h2 style="color:#5a7a62">New Event Inquiry — ${sessionType}</h2>
//       <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
//       <p><strong>Name:</strong> ${fullName}</p>
//       <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
//       <p><strong>Phone:</strong> ${phone || "—"}</p>
//       <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
//       <p><strong>Session Type:</strong> ${sessionType}</p>
//       <p><strong>Desired Date:</strong> ${date || "—"}</p>
//       <p><strong>Venue:</strong> ${venue || "—"}</p>
//       <p><strong>Expected Attendees:</strong> ${attendees || "—"}</p>
//       <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
//       <p><strong>Description:</strong></p>
//       <p style="white-space:pre-wrap">${description || "No additional details provided."}</p>
//     </div>
//   `,
// });

export async function POST(req: Request) {
  const { firstName, email, sessionType } = await req.json();

  if (!firstName || !email || !sessionType) {
    return NextResponse.json({ error: "Name, email, and session type are required." }, { status: 400 });
  }

  // TODO: activate Resend once domain is verified and RESEND_API_KEY is in Vercel
  return NextResponse.json({ ok: true });
}
