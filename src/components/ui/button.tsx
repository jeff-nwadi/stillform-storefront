import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "icon";
  asChild?: boolean;
};

export function Button({ className, variant = "default", size = "default", asChild, children, ...props }: ButtonProps) {
  const classes = cn("button", `button-${variant}`, size === "icon" && "button-icon", className);
  if (asChild && React.isValidElement(children)) return React.cloneElement(children as React.ReactElement<{ className?: string }>, { className: cn(classes, (children.props as { className?: string }).className) });
  return <button className={classes} {...props}>{children}</button>;
}
