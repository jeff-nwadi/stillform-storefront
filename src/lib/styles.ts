/**
 * Class strings for the handful of patterns that repeat across pages.
 * Combine them with `cn()` when a page needs to adjust one.
 */

export const eyebrow =
  "block text-[11px] leading-[1.3] font-medium tracking-[.16em] text-sea uppercase";

export const textLink =
  "inline-flex items-center gap-[9px] border-b border-[#9ca29d] pb-[5px] text-[12px] tracking-[.06em] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-[2px]";

export const pageWrap =
  "mx-auto max-w-[1600px] px-[7.2%] pt-[35px] pb-[100px] max-lg:px-[5%] max-sm:pt-[25px] max-sm:pb-[72px]";

export const breadcrumbs =
  "flex items-center gap-[11px] text-[12px] text-[#828983] [&_a]:flex [&_a]:items-center [&_a]:gap-[5px] [&_span]:text-[#b6bab5]";

/** Header row above a product grid: title on the left, link on the right. */
export const sectionHeading =
  "mb-8 flex items-end justify-between max-sm:items-start max-sm:gap-4";

export const sectionHeadingTitle =
  "mt-[11px] font-serif text-[40px] leading-[1.04] font-normal tracking-[-.035em] max-sm:text-[34px]";

export const sectionHeadingLink =
  "max-sm:mt-[18px] max-sm:text-[8px] max-sm:whitespace-nowrap";
