import React, { ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
  contentClassName?: string;
}

/**
 * Tooltip component for displaying additional information on hover
 *
 * @param children - Element that triggers the tooltip
 * @param content - Content to display in the tooltip
 * @param position - Position of the tooltip
 * @param delay - Delay before showing tooltip (ms)
 * @param className - Additional class for the wrapper
 * @param contentClassName - Additional class for tooltip content
 */
const Tooltip = ({
  children,
  content,
  position = "top",
  delay = 300,
  className = "",
  contentClassName = "",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  // Position classes
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  // Arrow classes
  const arrowClasses = {
    top: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent",
    bottom:
      "top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent",
    left: "right-0 top-1/2 transform translate-x-1 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent",
    right:
      "left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onFocus={showTip}
      onBlur={hideTip}
    >
      {children}

      {isVisible && (
        <div
          className={`
            absolute z-50 whitespace-nowrap 
            px-3 py-2 bg-gray-900 text-white text-xs rounded-md shadow-lg
            ${positionClasses[position]}
            ${contentClassName}
          `}
          role="tooltip"
        >
          <div
            className={`
              absolute w-0 h-0 border-4
              ${arrowClasses[position]}
            `}
          ></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
