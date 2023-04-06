import {
  forwardRef,
  InputHTMLAttributes,
  MouseEventHandler,
  useState,
} from "react";

import styles from "./Input.module.scss";
import { create } from "@/helpers/createBem";
import { InputWrapper } from "./InputWrapper";

export const bem = create(styles, "Input");

export type InputButtonProps = {
  id: string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type InputProps = {
  id: string;
  name?: string;
  type?: "text" | "password" | "number" | "email" | "tel";
  error?: string;
  loading?: boolean;
  rightButton?: InputButtonProps;
  rightText?: string;
  fieldClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      id,
      className,
      fieldClassName,
      autoComplete,
      value,
      error,
      type = "text",
      disabled = false,
      loading,
      rightButton,
      rightText,
      onBlur,
      onFocus,
      ...attributes
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    return (
      <InputWrapper
        id={id}
        className={className}
        fieldClassName={fieldClassName}
        error={error}
        disabled={disabled}
        focused={focused}
        label={children}
      >
        <>
          <input
            className={bem("field", {
              "is-disabled": disabled,
              "has-error": !!error,
            })}
            id={id}
            ref={ref}
            value={value}
            type={type}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-describedby={error ? `${id}-error` : undefined}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            data-valid={!error}
            {...attributes}
          />

          {rightText && (
            <div className={bem("right-text-wrapper")}>
              <span className={bem("right-text-wrapper__text")}>
                {rightText}
              </span>
            </div>
          )}
        </>
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";
