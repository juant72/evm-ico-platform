import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  bordered?: boolean;
  elevated?: boolean;
  interactive?: boolean;
}

/**
 * Reusable card component for containing content
 *
 * @param children - Card content
 * @param title - Card title
 * @param subtitle - Card subtitle
 * @param footer - Card footer content
 * @param className - Additional class for the card
 * @param headerClassName - Additional class for the header
 * @param bodyClassName - Additional class for the body
 * @param footerClassName - Additional class for the footer
 * @param bordered - Whether the card should have a border
 * @param elevated - Whether the card should have elevation (shadow)
 * @param interactive - Whether the card should have hover effects
 */
const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  bordered = true,
  elevated = false,
  interactive = false,
}: CardProps) => {
  const borderClass = bordered ? "border border-gray-700" : "";
  const shadowClass = elevated ? "shadow-lg" : "";
  const interactiveClass = interactive
    ? "transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 hover:border-blue-500"
    : "";

  return (
    <div
      className={`
        bg-gray-800 rounded-lg overflow-hidden
        ${borderClass}
        ${shadowClass}
        ${interactiveClass}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div
          className={`p-5 ${
            bordered ? "border-b border-gray-700" : ""
          } ${headerClassName}`}
        >
          {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
        </div>
      )}

      <div className={`p-5 ${bodyClassName}`}>{children}</div>

      {footer && (
        <div
          className={`p-5 ${
            bordered ? "border-t border-gray-700" : ""
          } ${footerClassName}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
