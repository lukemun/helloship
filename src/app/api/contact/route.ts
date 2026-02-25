import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  problem: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown) {
  return String(value ?? "").trim();
}

function validate(payload: ContactPayload) {
  if (payload.website) {
    return "Invalid submission.";
  }
  if (!payload.name || payload.name.length > 80) {
    return "Please provide your name.";
  }
  if (!emailPattern.test(payload.email) || payload.email.length > 120) {
    return "Please provide a valid email.";
  }
  if (!payload.company || payload.company.length > 120) {
    return "Please provide your company name.";
  }
  if (!payload.problem || payload.problem.length > 2000) {
    return "Please describe the issue you need help with.";
  }
  return null;
}

export async function POST(request: NextRequest) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Helloship Contact <onboarding@resend.dev>";

  if (!resendApiKey || !toEmail) {
    return NextResponse.json(
      { error: "Contact service is not configured yet." },
      { status: 500 }
    );
  }

  const body = (await request.json()) as ContactPayload;
  const payload: ContactPayload = {
    name: sanitize(body.name),
    email: sanitize(body.email),
    company: sanitize(body.company),
    problem: sanitize(body.problem),
    website: sanitize(body.website),
  };

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const lines = [
    "New Helloship website lead",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company}`,
    `Submitted: ${submittedAt}`,
    "",
    "Issue:",
    payload.problem,
  ];

  async function sendEmail(emailPayload: {
    to: string[];
    subject: string;
    text: string;
    reply_to?: string;
  }) {
    return fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        ...emailPayload,
      }),
    });
  }

  const resendResponse = await sendEmail({
    to: [toEmail],
    reply_to: payload.email,
    subject: `New lead from ${payload.name} (${payload.company})`,
    text: lines.join("\n"),
  });

  if (!resendResponse.ok) {
    const responseText = await resendResponse.text();
    return NextResponse.json(
      { error: `Email provider error: ${responseText}` },
      { status: 502 }
    );
  }

  const confirmationLines = [
    `Hi ${payload.name},`,
    "",
    "Thanks for reaching out to Helloship. We got your details and will reply within 24 hours.",
    "",
    "Here is what you submitted:",
    `Company: ${payload.company}`,
    `Issue: ${payload.problem}`,
    "",
    "If you want to add more context, just reply to this email.",
    "",
    "Luke",
    "Helloship",
  ];

  try {
    const confirmationResponse = await sendEmail({
      to: [payload.email],
      reply_to: toEmail,
      subject: "We got your request - Helloship",
      text: confirmationLines.join("\n"),
    });
    if (!confirmationResponse.ok) {
      await confirmationResponse.text();
    }
  } catch {
    // Do not block lead capture if the confirmation email fails.
  }

  return NextResponse.json({ ok: true });
}
