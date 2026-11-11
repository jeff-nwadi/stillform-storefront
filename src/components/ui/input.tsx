import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputStyles = cva("w-full outline-none placeholder:text-[#d0d0cb]", {
  variants: {
    variant: {
      /** Borderless field with a bottom rule, used on dark surfaces. */
      underline: "h-12 border-b border-[#808883] bg-transparent px-1 focus:border-white",
      /** Boxed field used in forms. Also suits `<select>` and `<textarea>`. */
      box: "h-[46px] border border-[#d7dad4] bg-[#fbfbf8] px-3 text-ink focus:border-[#7c8980]",
    },
  },
  defaultVariants: { variant: "underline" },
});

type InputVariantProps = VariantProps<typeof inputStyles>;

/** Field classes for form controls that are not an `<Input>`. */
export function inputVariants({ className, ...variants }: InputVariantProps & { className?: string } = {}) {
  return cn(inputStyles(variants), className);
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & InputVariantProps;
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, variant, ...props }, ref) => <input ref={ref} type={type} className={inputVariants({ variant, className })} {...props} />);
Input.displayName = "Input";
