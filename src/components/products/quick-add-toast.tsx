"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useCartStore } from "@/store/cart-provider";

export function QuickAddToast() {
  const feedback = useCartStore((state) => state.quickAddFeedback);

  if (!feedback) return null;

  const adding = feedback.status === "adding";
  return (
    <div className={`quick-add-toast${adding ? " is-loading" : " is-success"}`} role="status" aria-live="polite" key={feedback.id}>
      <span className="quick-add-toast-icon" aria-hidden="true">
        {adding ? <LoaderCircle className="quick-add-spinner" /> : <Check />}
      </span>
      <span className="quick-add-toast-copy">
        <strong>{adding ? "Adding to your bag" : "Added to your bag"}</strong>
        <span>{feedback.productName}</span>
        {adding && <span className="quick-add-toast-skeleton" aria-hidden="true"><i /><i /></span>}
      </span>
    </div>
  );
}
