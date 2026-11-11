import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Roboto } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { QuickAddToast } from "@/components/products/quick-add-toast";
import { CartProvider } from "@/store/cart-provider";
import "./globals.css";
import "lenis/dist/lenis.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Stillform — Considered living", template: "%s | Stillform" },
  description: "Thoughtful homewares and considered objects for everyday rituals.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable} scroll-smooth`}>
      <body className="bg-paper text-[16px] leading-[1.55] text-ink antialiased">
        <CartProvider>
          <SmoothScroll>
            {/* The account page is a full-height split layout, so it hides the footer. */}
            <div className="min-h-screen [&:has([data-account-page])>footer]:hidden">
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
              <QuickAddToast />
            </div>
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
