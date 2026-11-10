import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { QuickAddToast } from "@/components/products/quick-add-toast";
import { CartProvider } from "@/store/cart-provider";
import "./globals.css";
import "lenis/dist/lenis.css";

export const metadata: Metadata = {
  title: { default: "Stillform — Considered living", template: "%s | Stillform" },
  description: "Thoughtful homewares and considered objects for everyday rituals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider><SmoothScroll><div className="site-shell"><SiteHeader /><main>{children}</main><SiteFooter /><QuickAddToast /></div></SmoothScroll></CartProvider></body></html>;
}
