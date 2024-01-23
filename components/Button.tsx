import React, { forwardRef } from "react";

// any special prop other than the normal.
interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  specialClassName?: string;
}

// Ref type
type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, ButtonProps>(
  ({ specialClassName, children, ...rest }, ref) => (
    <button
      ref={ref}
      {...rest}
      className={`m-auto p-2 flex items-center border border-primary-light dark:border-primary-dark rounded-md ${specialClassName}`}>
      {children}
    </button>
  )
);
