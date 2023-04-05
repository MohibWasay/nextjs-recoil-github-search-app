import { create } from "@/helpers/createBem"
import { FC, ReactNode } from "react"

import { InputError } from "./InputError"

import styles from "./InputWrapper.module.scss"

export const bem = create(styles, "InputWrapper")

export type InputWrapperProps = {
  children: ReactNode
  id?: string
  className?: string
  fieldClassName?: string
  error?: string
  disabled?: boolean
  focused?: boolean
  label?: ReactNode
}

export const InputWrapper: FC<InputWrapperProps> = ({
  children,
  id,
  className,
  fieldClassName,
  error,
  disabled,
  focused,
  label,
}) => {
  const modifiers = {
    "is-disabled": !!disabled,
    "is-focused": !!focused && !error,
    "has-error": !!error,
  }

  return (
    <div className={bem(undefined, undefined, className)}>
      {label && (
        <label className={bem("label", modifiers)} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={bem("field-wrapper", modifiers, fieldClassName)}>
        {children}
      </div>
      {error && <InputError id={`${id}-error`}>{error}</InputError>}
    </div>
  )
}
