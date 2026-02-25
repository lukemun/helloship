"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      problem: String(formData.get("problem") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      setMessage("Thanks. We got it and will reply within 24 hours.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        className="contact-honeypot"
      />
      <div className="contact-grid">
        <label className="contact-field">
          Name
          <input type="text" name="name" required maxLength={80} />
        </label>
        <label className="contact-field">
          Email
          <input type="email" name="email" required maxLength={120} />
        </label>
      </div>
      <label className="contact-field">
        Company
        <input type="text" name="company" required maxLength={120} />
      </label>
      <label className="contact-field">
        What issue are you trying to solve?
        <textarea name="problem" required maxLength={2000} rows={5} />
      </label>
      <div className="cta-actions">
        <button type="submit" className="btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send details \u2192"}
        </button>
      </div>
      {message ? <p className={`contact-message contact-${status}`}>{message}</p> : null}
    </form>
  );
}
