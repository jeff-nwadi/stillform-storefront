import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-sm border border-transparent px-[22px] text-[10px] font-medium tracking-[.12em] uppercase transition-[background-color,color,border-color,translate] duration-250 hover:-translate-y-px max-sm:text-[11px]",
  {
    variants: {
      variant: {
        default: "bg-ink text-white hover:bg-[#33454c]",
        secondary: "bg-paper text-ink hover:bg-white",
        ghost: "bg-transparent text-ink",
        outline: "border-line bg-transparent",
      },
      size: {
        default: "",
        icon: "size-[42px] p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonStyles>;

/** Button classes for elements that are not a `<Button>`, such as links. */
export function buttonVariants({ className, ...variants }: ButtonVariantProps & { className?: string } = {}) {
  return cn(buttonStyles(variants), className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps & {
  asChild?: boolean;
};

export function Button({ className, variant, size, asChild, children, ...props }: ButtonProps) {
  const classes = buttonVariants({ variant, size, className });
  if (asChild && React.isValidElement(children)) return React.cloneElement(children as React.ReactElement<{ className?: string }>, { className: cn(classes, (children.props as { className?: string }).className) });
  return <button className={classes} {...props}>{children}</button>;
}
