"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input, inputVariants } from "@/components/ui/input";

const field = "flex flex-col gap-[7px] text-[12px] text-[#424e48]";
const control = "p-3 text-[14px] leading-[normal]";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className={field}>
        <span>Your name</span>
        <Input variant="box" className={control} name="name" autoComplete="name" required />
      </label>
      <label className={field}>
        <span>Email address</span>
        <Input variant="box" className={control} name="email" type="email" autoComplete="email" required />
      </label>
      <label className={field}>
        <span>What can we help with?</span>
        <select className={inputVariants({ variant: "box", className: control })} name="topic" defaultValue="general">
          <option value="general">A general question</option>
          <option value="product">A product question</option>
          <option value="order">An order or delivery</option>
          <option value="press">Press and partnerships</option>
        </select>
      </label>
      <label className={field}>
        <span>Your message</span>
        <textarea className={inputVariants({ variant: "box", className: `${control} h-auto resize-y leading-[1.6]` })} name="message" rows={5} required />
      </label>
      <button type="submit" className={buttonVariants({ className: "mt-1 justify-between" })}>
        {sent ? "Message prepared" : "Send a message"}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
      {sent && (
        <p className="bg-[#e8ebe5] px-[15px] py-[13px] text-[13px] text-[#48584e]!" role="status">
          Thanks for reaching out. This preview form does not send or store messages yet.
        </p>
      )}
    </form>
  );
}
