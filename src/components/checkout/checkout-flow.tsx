"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-provider";
import { formatPrice } from "@/lib/products";

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
      <div className="checkout-empty page-wrap">
        <span className="eyebrow">Nothing to check out yet</span>
        <h1>Your bag is waiting.</h1>
        <p>Add something considered to your bag and it will be here when you are ready.</p>
        <Link href="/shop" className="button button-default">Explore the collection <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-topline">
        <Link href="/cart" className="checkout-back"><ArrowLeft size={15} /> Return to bag</Link>
        <span className="checkout-secure"><LockKeyhole size={14} /> Secure checkout</span>
      </div>

      <div className="checkout-layout">
        <main className="checkout-main">
          <div className="checkout-heading">
            <span className="eyebrow">The final details</span>
            <h1>Checkout</h1>
            <p>Thoughtfully packed and on its way to you.</p>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="checkout-section">
              <div className="checkout-section-heading"><span>01</span><h2>Contact</h2></div>
              <div className="checkout-fields">
                <label className="checkout-field checkout-field-full"><span>Email address</span><Input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
                <label className="checkout-field checkout-field-full checkout-checkbox"><input type="checkbox" name="updates" /> <span>Email me with occasional notes from Stillform</span></label>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-heading"><span>02</span><h2>Delivery address</h2></div>
              <div className="checkout-fields">
                <label className="checkout-field"><span>First name</span><Input name="firstName" autoComplete="given-name" required /></label>
                <label className="checkout-field"><span>Last name</span><Input name="lastName" autoComplete="family-name" required /></label>
                <label className="checkout-field checkout-field-full"><span>Address</span><Input name="address" autoComplete="street-address" placeholder="Street address" required /></label>
                <label className="checkout-field checkout-field-full"><span>Apartment, suite, etc. <small>Optional</small></span><Input name="addressExtra" autoComplete="address-line2" /></label>
                <label className="checkout-field"><span>City</span><Input name="city" autoComplete="address-level2" required /></label>
                <label className="checkout-field"><span>State / region</span><Input name="region" autoComplete="address-level1" required /></label>
                <label className="checkout-field"><span>Postal code</span><Input name="postalCode" autoComplete="postal-code" required /></label>
                <label className="checkout-field"><span>Country</span><select name="country" autoComplete="country-name" defaultValue="" required><option value="" disabled>Select country</option><option value="NG">Nigeria</option><option value="US">United States</option><option value="GB">United Kingdom</option><option value="CA">Canada</option><option value="AU">Australia</option></select></label>
                <label className="checkout-field checkout-field-full"><span>Phone <small>Optional</small></span><Input type="tel" name="phone" autoComplete="tel" /></label>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-heading"><span>03</span><h2>Delivery</h2></div>
              <div className="checkout-delivery-option"><span className="checkout-radio selected" /><span><strong>Standard delivery</strong><small>Carefully packed for its journey</small></span><strong>{subtotal >= 150 ? "Complimentary" : "Calculated after address"}</strong></div>
            </section>

            <section className="checkout-section checkout-payment">
              <div className="checkout-section-heading"><span>04</span><h2>Payment</h2></div>
              <div className="checkout-payment-placeholder"><ShieldCheck size={19} /><div><strong>Secure payment</strong><p>Payment options will appear here when checkout is connected.</p></div></div>
            </section>

            <button className="button button-default checkout-place-order" type="submit">Continue to payment <ArrowRight size={16} /></button>
            {notice && <p className="checkout-notice" role="status">{notice}</p>}
            <p className="checkout-privacy">Your details are used to prepare this order preview and are not submitted to a payment provider.</p>
          </form>
        </main>

        <aside className="checkout-summary">
          <div className="checkout-summary-heading"><span className="eyebrow">Your selection</span><Link href="/cart">Edit bag</Link></div>
          <div className="checkout-summary-items">
            {items.map(({ product, quantity, finish }) => (
              <article className="checkout-summary-item" key={`${product.id}-${finish}`}>
                <Link className="checkout-summary-image" href={`/products/${product.slug}`}><Image src={product.image} alt={product.alt} fill sizes="76px" unoptimized /><span>{quantity}</span></Link>
                <div className="checkout-summary-copy"><Link href={`/products/${product.slug}`}>{product.name}</Link><small>{finish}</small></div>
                <strong>{formatPrice(product.price * quantity)}</strong>
              </article>
            ))}
          </div>
          <div className="checkout-summary-calculations">
            <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div><span>Shipping</span><span>{subtotal >= 150 ? "Complimentary" : "Calculated after address"}</span></div>
            <div><span>Taxes</span><span>Calculated after address</span></div>
          </div>
          <div className="checkout-total"><span>Subtotal</span><strong>{formatPrice(subtotal)}<small>USD</small></strong></div>
          <p className="checkout-shipping-note">Shipping and taxes are finalized at payment. Complimentary shipping on orders over $150.</p>
        </aside>
      </div>
    </div>
  );
}
