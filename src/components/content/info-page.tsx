import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { breadcrumbs, eyebrow as eyebrowClass, pageWrap } from "@/lib/styles";

/** Callout shown at the top of the policy pages. */
export const policyNote = "border-l-2 border-[#929e94] bg-[#e8e9e4] px-[19px] py-[17px] text-[14px]";

/** Closing small print. Uses `!` to win over the body copy colour. */
export const infoFootnote = "pt-6 text-[12px] text-[#858d87]!";

type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

type InfoSectionProps = {
  title: string;
  children: ReactNode;
};

export function InfoPage({ eyebrow, title, intro, children }: InfoPageProps) {
  return (
    <main className={cn(pageWrap, "max-w-[1120px] pt-[30px] pb-[110px] max-md:pt-[25px] max-md:pb-[75px] max-sm:pt-[25px] max-sm:pb-[75px]")}>
      <div className={breadcrumbs}>
        <Link href="/">Home</Link>
        <span>/</span>
        {title}
      </div>
      <header className="border-b border-line pt-[74px] pb-[58px] max-md:pt-[54px] max-md:pb-[38px]">
        <span className={eyebrowClass}>{eyebrow}</span>
        <h1 className="mt-[17px] mb-[14px] font-serif text-[clamp(46px,6vw,72px)] leading-none font-normal tracking-[-.045em] max-md:text-[48px] max-sm:text-[38px]">{title}</h1>
        <p className="max-w-[610px] text-[17px] leading-[1.75] text-[#6f7872] max-md:text-[15px]">{intro}</p>
      </header>
      {/* Pages pass plain <p> and <a> elements, so body copy is styled from here. */}
      <div className="max-w-[800px] pt-[18px] [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-[3px] [&_p]:mb-4 [&_p]:leading-[1.85] [&_p]:text-[#68726c]">{children}</div>
    </main>
  );
}

export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <section className="grid grid-cols-[minmax(160px,.7fr)_minmax(0,1.3fr)] gap-9 border-b border-line py-[30px] max-md:grid-cols-[1fr] max-md:gap-[14px] max-md:py-6">
      <h2 className="font-serif text-[28px] leading-[1.15] font-normal max-md:text-[25px] max-sm:text-[21px]">{title}</h2>
      <div className="[&_p:last-child]:mb-0 [&_ul]:mb-[14px] [&_ul]:pl-5 [&_ul]:leading-[1.9] [&_ul]:text-[#68726c]">{children}</div>
    </section>
  );
}
