"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cart-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { breadcrumbs, eyebrow, pageWrap, textLink } from "@/lib/styles";

const stepButton = "grid h-full w-[27px] cursor-pointer place-items-center";
const summaryRow = "flex justify-between border-b border-[#cfd2cb] py-[13px] text-[13px]";

type CartLineItemProps = {
  product: Product;
  quantity: number;
  finish: string;
  onRemove: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
};

function CartLineItem({ product, quantity, finish, onRemove, onQuantityChange }: CartLineItemProps) {
  return (
    <article className="grid grid-cols-[115px_1fr_auto_22px] items-center gap-[19px] border-b border-line py-5 max-sm:grid-cols-[83px_1fr_auto_18px] max-sm:gap-[11px]">
      <Link className="relative aspect-[.9] w-[115px] bg-[#e2e0d8] max-sm:w-[83px]" href={`/products/${product.slug}`}>
        <Image src={product.image} alt={product.alt} fill sizes="160px" unoptimized />
      </Link>

      <div>
        <Link href={`/products/${product.slug}`} className="font-serif text-[19px] max-sm:text-[16px]">
          {product.name}
        </Link>
        <p className="mt-1 mb-3 text-[12px] text-[#818983] max-sm:text-[11px]">{finish} · {formatPrice(product.price)}</p>

        <div className="flex h-[30px] w-[92px] items-center justify-between border border-line">
          <button
            className={stepButton}
            type="button"
            aria-label={`Decrease ${product.name} quantity`}
            onClick={() => onQuantityChange(product.id, quantity - 1)}
          >
            <Minus size={14} />
          </button>
          <span className="text-[12px]" aria-live="polite">{quantity}</span>
          <button
            className={stepButton}
            type="button"
            aria-label={`Increase ${product.name} quantity`}
            onClick={() => onQuantityChange(product.id, quantity + 1)}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <strong className="self-start pt-[5px] text-[13px] font-normal max-sm:text-[12px]">{formatPrice(product.price * quantity)}</strong>
      <button
        className="cursor-pointer self-start px-[6px] pt-[5px] text-[#7e8781]"
        type="button"
        aria-label={`Remove ${product.name} from your bag`}
        onClick={() => onRemove(product.id)}
      >
        <X size={17} />
      </button>
    </article>
  );
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className={cn(pageWrap, "min-h-[65vh]")}>
      <div className={breadcrumbs}>
        <Link href="/">Home</Link>
        <span>/</span>
        Your bag
      </div>

      <div className="flex items-end justify-between pt-[57px] pb-[38px] max-sm:pt-11 max-sm:pb-[29px]">
        <div>
          <span className={eyebrow}>A good choice</span>
          <h1 className="mt-[14px] font-serif text-[clamp(48px,5vw,68px)] leading-none font-normal tracking-[-.04em] max-sm:text-[42px]">Your bag <span className="align-middle font-sans text-[17px] leading-[normal] text-[#848b85]">({itemCount})</span></h1>
        </div>
        <Link href="/shop" className={cn(textLink, "max-sm:text-[8px]")}>
          <span>Continue shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="pt-[75px] pb-[100px] text-center">
          <p className="mb-[23px] font-serif text-[28px] leading-[normal]">Your bag is waiting for something lovely.</p>
          <Link href="/shop" className={buttonVariants()}>
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-[1.6fr_.8fr] gap-[8%] max-sm:grid-cols-[1fr] max-sm:gap-8">
          <div className="border-t border-line">
            {items.map(({ product, quantity, finish }) => (
              <CartLineItem
                key={`${product.id}-${finish}`}
                product={product}
                quantity={quantity}
                finish={finish}
                onRemove={removeItem}
                onQuantityChange={setQuantity}
              />
            ))}
          </div>

          <aside className="h-max bg-[#e8e9e4] p-7">
            <span className={cn(eyebrow, "mb-6")}>Your order</span>
            <div className={summaryRow}>
              <span>Subtotal</span>
              <strong className="font-medium">{formatPrice(subtotal)}</strong>
            </div>
            <div className={summaryRow}>
              <span>Shipping</span>
              <span>{subtotal >= 150 ? "Complimentary" : "Calculated at checkout"}</span>
            </div>
            <p className="my-[1em] text-[11px] text-[#858d87]">Taxes calculated at checkout.</p>
            <Link className={buttonVariants({ className: "mt-[18px] w-full" })} href="/checkout">
              Continue to checkout <ArrowRight size={16} />
            </Link>
            <Link href="/shop" className={cn(textLink, "text-[9px]")}>Keep exploring</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
