"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useCartStore } from "@/store/cart-provider";
import { cn } from "@/lib/utils";

const skeletonBar =
  "block h-[5px] animate-shimmer rounded-[4px] bg-[linear-gradient(90deg,#dfe3dd_20%,#f5f6f1_50%,#dfe3dd_80%)] bg-size-[200%_100%] motion-reduce:animate-none";

export function QuickAddToast() {
  const feedback = useCartStore((state) => state.quickAddFeedback);

  if (!feedback) return null;

  const adding = feedback.status === "adding";
  return (
    <div className="fixed right-7 bottom-7 z-30 flex w-[min(360px,calc(100vw-32px))] animate-toast-in items-center gap-[13px] border border-[#d9ded7] bg-[#f9faf6] px-[18px] py-4 text-ink shadow-[0_14px_40px_#1e2b3120] motion-reduce:animate-none max-sm:right-4 max-sm:bottom-4" role="status" aria-live="polite" key={feedback.id}>
      <span className={cn("grid size-9 flex-[0_0_36px] place-items-center rounded-full bg-[#e7ebe5] text-[#56665e]", adding && "animate-roam motion-reduce:animate-none")} aria-hidden="true">
        {adding ? <LoaderCircle className="animate-spinner motion-reduce:animate-none" /> : <Check />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[2px] text-[13px]">
        <strong className="font-medium">{adding ? "Adding to your bag" : "Added to your bag"}</strong>
        <span className="truncate text-[#717a74]">{feedback.productName}</span>
        {adding && <span className="mt-[5px] flex gap-[6px]" aria-hidden="true"><i className={cn(skeletonBar, "w-[74px]")} /><i className={cn(skeletonBar, "w-[37px] [animation-delay:.12s]")} /></span>}
      </span>
    </div>
  );
}
