"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input, inputVariants } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-provider";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";
import { eyebrow, pageWrap } from "@/lib/styles";

const pageHeading =
  "my-3 font-serif text-[clamp(42px,5vw,60px)] leading-none font-normal tracking-[-.04em] max-sm:text-[34px]";
const topLink = "inline-flex items-center gap-2 text-[12px] text-[#68726c]";
const fieldGrid = "grid grid-cols-[1fr_1fr] gap-x-[13px] gap-y-[15px] max-md:gap-x-[10px] max-md:gap-y-[13px]";
const field = "flex flex-col gap-[7px] text-[12px] text-[#424e48]";
const fullField = cn(field, "col-span-full");
const optional = "ml-1 text-[11px] text-[#858d87]";
const fieldInput = "placeholder:text-[#a2a8a2]";
const calculationRow = "flex justify-between gap-3 py-[7px] text-[12px] text-[#6e7771]";
const calculationValue = "max-w-[60%] text-right";

function CheckoutSection({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <section className="border-b border-line pt-[25px] pb-7 max-md:pt-[21px] max-md:pb-[23px]">
      <div className="mb-[19px] flex items-center gap-3">
        <span className="text-[11px] tracking-[.08em] text-[#8a938d]">{step}</span>
        <h2 className="font-serif text-[25px] leading-[1.1] font-normal max-md:text-[23px] max-sm:text-[19px]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function CheckoutFlow() {
  const items = useCartStore((state) => state.items);
  const subtotal = items.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Checkout is in preview mode. Payment and order placement are not connected yet.");
  }

  if (!items.length) {
    return (
      <div className={cn(pageWrap, "flex min-h-[58vh] flex-col items-center justify-center text-center max-md:min-h-[50vh]")}>
        <span className={eyebrow}>Nothing to check out yet</span>
        <h1 className={cn(pageHeading, "max-md:text-[43px]")}>Your bag is waiting.</h1>
        <p className="mb-6 max-w-[390px] leading-[1.7] text-[#727b75]">Add something considered to your bag and it will be here when you are ready.</p>
        <Link href="/shop" className={buttonVariants()}>Explore the collection <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-[6.5%] pb-[100px] max-lg:px-[5%] max-md:px-[6%] max-md:pb-[70px]">
      <div className="grid min-h-[78px] grid-cols-[1fr_1fr_1fr] items-center border-b border-line max-md:min-h-[66px] max-md:grid-cols-[1fr_1fr]">
        <Link href="/cart" className={cn(topLink, "hover:text-ink max-md:col-start-1 max-md:row-start-2 max-md:pb-3")}><ArrowLeft size={15} /> Return to bag</Link>
        <span className={cn(topLink, "justify-self-end max-md:col-start-2 max-md:row-span-2 max-md:row-start-1")}><LockKeyhole size={14} /> Secure checkout</span>
      </div>

      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(350px,.85fr)] gap-[9%] pt-[46px] max-lg:grid-cols-[minmax(0,1fr)_minmax(300px,.78fr)] max-lg:gap-[5%] max-md:flex max-md:flex-col-reverse max-md:gap-[25px] max-md:pt-[22px]">
        <main className="w-full max-w-[680px]">
          <div className="pb-[22px] max-md:pb-[10px]">
            <span className={eyebrow}>The final details</span>
            <h1 className={pageHeading}>Checkout</h1>
            <p className="text-[#727b75]">Thoughtfully packed and on its way to you.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <CheckoutSection step="01" title="Contact">
              <div className={fieldGrid}>
                <label className={fullField}><span>Email address</span><Input variant="box" className={fieldInput} type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
                <label className={cn(fullField, "flex-row items-center gap-[9px] text-[#737b75]")}><input className="my-[3px] mr-[3px] ml-1 size-[15px] accent-ink" type="checkbox" name="updates" /> <span>Email me with occasional notes from Stillform</span></label>
              </div>
            </CheckoutSection>

            <CheckoutSection step="02" title="Delivery address">
              <div className={fieldGrid}>
                <label className={field}><span>First name</span><Input variant="box" className={fieldInput} name="firstName" autoComplete="given-name" required /></label>
                <label className={field}><span>Last name</span><Input variant="box" className={fieldInput} name="lastName" autoComplete="family-name" required /></label>
                <label className={fullField}><span>Address</span><Input variant="box" className={fieldInput} name="address" autoComplete="street-address" placeholder="Street address" required /></label>
                <label className={fullField}><span>Apartment, suite, etc. <small className={optional}>Optional</small></span><Input variant="box" className={fieldInput} name="addressExtra" autoComplete="address-line2" /></label>
                <label className={field}><span>City</span><Input variant="box" className={fieldInput} name="city" autoComplete="address-level2" required /></label>
                <label className={field}><span>State / region</span><Input variant="box" className={fieldInput} name="region" autoComplete="address-level1" required /></label>
                <label className={field}><span>Postal code</span><Input variant="box" className={fieldInput} name="postalCode" autoComplete="postal-code" required /></label>
                <label className={field}><span>Country</span><select className={inputVariants({ variant: "box" })} name="country" autoComplete="country-name" defaultValue="" required><option value="" disabled>Select country</option><option value="NG">Nigeria</option><option value="US">United States</option><option value="GB">United Kingdom</option><option value="CA">Canada</option><option value="AU">Australia</option></select></label>
                <label className={fullField}><span>Phone <small className={optional}>Optional</small></span><Input variant="box" className={fieldInput} type="tel" name="phone" autoComplete="tel" /></label>
              </div>
            </CheckoutSection>

            <CheckoutSection step="03" title="Delivery">
              <div className="grid grid-cols-[18px_1fr_auto] items-center gap-3 border border-[#aab5ac] bg-[#f8f9f5] p-4 text-[13px] max-md:grid-cols-[18px_1fr] max-md:gap-y-2"><span className="grid size-[15px] place-items-center rounded-full border border-[#758178] after:size-[7px] after:rounded-full after:bg-ink" /><span className="flex flex-col gap-[3px]"><strong>Standard delivery</strong><small className="text-[11px] text-[#7d867f]">Carefully packed for its journey</small></span><strong className="max-md:col-start-2">{subtotal >= 150 ? "Complimentary" : "Calculated after address"}</strong></div>
            </CheckoutSection>

            <CheckoutSection step="04" title="Payment">
              <div className="flex items-start gap-[13px] bg-[#f2f3ef] p-[17px] text-[#5f6d64]"><ShieldCheck size={19} /><div className="flex flex-col gap-1"><strong className="text-[13px] font-medium text-ink">Secure payment</strong><p className="text-[12px] leading-[1.6] text-[#737c75]">Payment options will appear here when checkout is connected.</p></div></div>
            </CheckoutSection>

            <button className={buttonVariants({ className: "mt-6 flex w-full justify-between px-[17px]" })} type="submit">Continue to payment <ArrowRight size={16} /></button>
            {notice && <p className="my-[1em] bg-[#e8ebe5] px-[15px] py-[13px] text-[13px] leading-[1.55] text-[#48584e]" role="status">{notice}</p>}
            <p className="mt-[13px] text-center text-[11px] leading-[1.6] text-[#858d87]">Your details are used to prepare this order preview and are not submitted to a payment provider.</p>
          </form>
        </main>

        <aside className="sticky top-[25px] self-start bg-[#f0f1ed] px-[25px] py-[27px] max-lg:px-[18px] max-lg:py-[22px] max-md:static max-md:w-full max-md:p-5">
          <div className="flex items-center justify-between border-b border-[#d7dad4] pb-[18px]"><span className={eyebrow}>Your selection</span><Link className="text-[12px] text-[#616c65] underline underline-offset-[3px]" href="/cart">Edit bag</Link></div>
          <div className="flex flex-col gap-[17px] py-[21px]">
            {items.map(({ product, quantity, finish }) => (
              <article className="grid grid-cols-[64px_1fr_auto] items-center gap-[13px]" key={`${product.id}-${finish}`}>
                <Link className="relative h-[70px] w-16 bg-[#e1e0d9]" href={`/products/${product.slug}`}><Image src={product.image} alt={product.alt} fill sizes="76px" unoptimized /><span className="absolute -top-[7px] -right-[7px] z-1 grid size-5 place-items-center rounded-full bg-[#737d75] text-[10px] text-white">{quantity}</span></Link>
                <div className="flex min-w-0 flex-col gap-[5px]"><Link className="font-serif text-[17px] leading-[1.1]" href={`/products/${product.slug}`}>{product.name}</Link><small className="text-[11px] text-[#7d867f]">{finish}</small></div>
                <strong className="text-[13px] font-medium whitespace-nowrap">{formatPrice(product.price * quantity)}</strong>
              </article>
            ))}
          </div>
          <div className="border-t border-[#d7dad4] pt-[14px]">
            <div className={calculationRow}><span>Subtotal</span><strong className="font-medium text-ink">{formatPrice(subtotal)}</strong></div>
            <div className={calculationRow}><span>Shipping</span><span className={calculationValue}>{subtotal >= 150 ? "Complimentary" : "Calculated after address"}</span></div>
            <div className={calculationRow}><span>Taxes</span><span className={calculationValue}>Calculated after address</span></div>
          </div>
          <div className="mt-[10px] flex items-center justify-between border-t border-[#d7dad4] pt-[18px] text-[14px]"><span>Subtotal</span><strong className="text-[20px] font-medium">{formatPrice(subtotal)}<small className="ml-[5px] text-[10px] font-normal text-[#828a84]">USD</small></strong></div>
          <p className="mt-[17px] text-[11px] leading-[1.55] text-[#7b847e]">Shipping and taxes are finalized at payment. Complimentary shipping on orders over $150.</p>
        </aside>
      </div>
    </div>
  );
}
