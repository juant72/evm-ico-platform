import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helpClassName?: string;
}

/**
 * Reusable input component with label, icons, and error handling
 *
 * @param label - Input label
 * @param error - Error message
 * @param helpText - Helper text
 * @param leftIcon - Icon to display on the left
 * @param rightIcon - Icon to display on the right
 * @param containerClassName - Additional class for the container
 * @param labelClassName - Additional class for the label
 * @param inputClassName - Additional class for the input
 * @param errorClassName - Additional class for the error message
 * @param helpClassName - Additional class for the help text
 * @param props - Additional input props
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helpText,
      leftIcon,
      rightIcon,
      containerClassName = "",
      labelClassName = "",
      inputClassName = "",
      errorClassName = "",
      helpClassName = "",
      id,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    // Base styles
    const baseInputClasses =
      "block w-full bg-gray-800 border text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500";

    // Error and disabled styles
    const errorClasses = error ? "border-red-500" : "border-gray-700";
    const disabledClasses = disabled
      ? "opacity-60 cursor-not-allowed bg-gray-700"
      : "";

    // Padding adjustment for icons
    const paddingClasses = leftIcon ? "pl-10" : rightIcon ? "pr-10" : "";

    return (
      <div className={`mb-4 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium text-gray-300 mb-1 ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
            ${baseInputClasses}
            ${errorClasses}
            ${disabledClasses}
            ${paddingClasses}
            py-2 px-4
            ${inputClassName}
            ${className}
          `}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helpText
                ? `${inputId}-help`
                : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className={`mt-1 text-sm text-red-500 ${errorClassName}`}
          >
            {error}
          </p>
        )}

        {!error && helpText && (
          <p
            id={`${inputId}-help`}
            className={`mt-1 text-sm text-gray-400 ${helpClassName}`}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
