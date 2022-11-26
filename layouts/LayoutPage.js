import React from "react";

const LayoutPage = React.forwardRef(
  ({ children, id, className, border = true }, ref) => {
    return (
      <div
        className={`min-h-screen container mx-auto pb-8 ${className}`}
        id={id}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export default LayoutPage;
