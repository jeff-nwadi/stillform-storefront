"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Your name</span>
        <Input name="name" autoComplete="name" required />
      </label>
      <label>
        <span>Email address</span>
        <Input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>What can we help with?</span>
        <select name="topic" defaultValue="general">
          <option value="general">A general question</option>
          <option value="product">A product question</option>
          <option value="order">An order or delivery</option>
          <option value="press">Press and partnerships</option>
        </select>
      </label>
      <label>
        <span>Your message</span>
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit" className="button button-default">
        {sent ? "Message prepared" : "Send a message"}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
      {sent && (
        <p className="contact-form-status" role="status">
          Thanks for reaching out. This preview form does not send or store messages yet.
        </p>
      )}
    </form>
  );
}
