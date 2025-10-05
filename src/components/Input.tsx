import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../utils/functios.util";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label             ?: string;
  error             ?: string;
  success           ?: string;
  helperText        ?: string;
  containerClassName?: string;
  labelClassName    ?: string;
  inputClassName    ?: string;
  isRequired        ?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      inputClassName,
      label,
      error,
      success,
      helperText,
      id,
      isRequired,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block text-sm font-medium text-gray-700",
              error && "text-red-700",
              success && "text-green-700",
              labelClassName
            )}
          >
            {label}
            {isRequired && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 border border-gray-300 rounded-lg",
            "bg-white text-gray-900",
            "placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:border-transparent",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error   && ["border-red-300 bg-red-50 text-red-900 focus:ring-red-400"],
            success && ["border-green-300 bg-green-50 text-green-900 focus:ring-green-400"],
            !error  && !success && ["focus:ring-blue-500"],
            inputClassName,
            className
          )}
          {...props}
        />

        {helperText && !error && !success && (
          <p className="text-sm text-gray-500">
            {helperText}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span>{error}</span>
          </p>
        )}

        {success && !error && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <span>{success}</span>
          </p>
        )}
      </div>
    );
  }
);

export default Input;