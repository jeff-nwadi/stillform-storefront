"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cart-provider";

type CartLineItemProps = {
  product: Product;
  quantity: number;
  finish: string;
  onRemove: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
};

function CartLineItem({ product, quantity, finish, onRemove, onQuantityChange }: CartLineItemProps) {
  return (
    <article className="cart-line">
      <Link className="cart-line-image" href={`/products/${product.slug}`}>
        <Image src={product.image} alt={product.alt} fill sizes="160px" unoptimized />
      </Link>

      <div className="cart-line-content">
        <Link href={`/products/${product.slug}`} className="cart-line-name">
          {product.name}
        </Link>
        <p>{finish} · {formatPrice(product.price)}</p>

        <div className="cart-qty">
          <button
            type="button"
            aria-label={`Decrease ${product.name} quantity`}
            onClick={() => onQuantityChange(product.id, quantity - 1)}
          >
            <Minus size={14} />
          </button>
          <span aria-live="polite">{quantity}</span>
          <button
            type="button"
            aria-label={`Increase ${product.name} quantity`}
            onClick={() => onQuantityChange(product.id, quantity + 1)}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <strong>{formatPrice(product.price * quantity)}</strong>
      <button
        className="remove-line"
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
    <div className="page-wrap cart-page">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        Your bag
      </div>

      <div className="cart-heading">
        <div>
          <span className="eyebrow">A good choice</span>
          <h1>Your bag <span>({itemCount})</span></h1>
        </div>
        <Link href="/shop" className="text-link">
          <span>Continue shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your bag is waiting for something lovely.</p>
          <Link href="/shop" className="button button-default">
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
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

          <aside className="order-summary">
            <span className="eyebrow">Your order</span>
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <span>{subtotal >= 150 ? "Complimentary" : "Calculated at checkout"}</span>
            </div>
            <p>Taxes calculated at checkout.</p>
            <Link className="button button-default checkout-button" href="/checkout">
              Continue to checkout <ArrowRight size={16} />
            </Link>
            <Link href="/shop" className="text-link">Keep exploring</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
