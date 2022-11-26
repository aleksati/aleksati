import React, { useEffect, useState } from "react";

const Button = React.forwardRef(
  (
    { onClick, onKeyDown, children, className, tabOrder, props, btnType },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }

    return (
      <button
        ref={ref}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={`m-auto p-2 flex items-center border border-primary-light dark:border-primary-dark rounded-md ${className}`}
        type={btnType ? btnType : "button"}
        tabIndex={tabOrder}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
