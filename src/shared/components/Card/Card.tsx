import { forwardRef, HTMLAttributes } from "react"

import { create } from "@/helpers/createBem"

import styles from "./Card.module.scss"

const bem = create(styles, "Card")

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  selected?: boolean
  noMargin?: boolean
  variant: "primary" | "secondary" | "info"
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant,
      selected = false,
      noMargin = false,
      ...attributes
    },
    ref,
  ) => {
    const modifiers = {
      [`is-${variant}`]: true,
      [`is-selected`]: selected,
      "no-margin": noMargin,
    }

    return (
      <div
        ref={ref}
        className={bem(undefined, modifiers, className)}
        {...attributes}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = "Card"
