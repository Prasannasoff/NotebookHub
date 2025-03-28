import React from "react";

export const Badge = ({ children, className, ...props }) => {
  return (
    <div
      className={`rounded-2xl p-4 bg-amber-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};