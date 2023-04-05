import { ButtonHTMLAttributes, forwardRef } from "react";
import { create } from "@/helpers/createBem";

import styles from "./Button.module.scss";

export type ButtonStyleProps = {
  variant: "primary" | "secondary" | "tertiary";
  large?: boolean;
};

export const bem = create(styles, "Button");

export type ButtonProps = ButtonStyleProps & {
  className?: string;
  type?: "button" | "submit" | "reset";
  withArrow?: boolean;
  labelClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      large,
      children,
      className,
      type = "button",
      withArrow,
      labelClassName,
      ...attributes
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={bem(
        undefined,
        {
          [variant]: true,
          large: !!large,
        },
        className
      )}
      {...attributes}
    >
      <span className={bem("label", undefined, labelClassName)}>
        {children}
      </span>
    </button>
  )
);

Button.displayName = "Button";
