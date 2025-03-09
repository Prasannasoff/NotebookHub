import React from "react";
export const Card = ({ children, className }) => {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className }) => {
    return <div className={`mb-4 ${className}`}>{children}</div>;
  };
  
  export const CardTitle = ({ children, className }) => {
    return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
  };
  
  export const CardDescription = ({ children, className }) => {
    return <p className={`text-gray-500 text-sm ${className}`}>{children}</p>;
  };
  
  export const CardContent = ({ children, className }) => {
    return <div className={`text-gray-700 ${className}`}>{children}</div>;
  };
  
  export const CardFooter = ({ children, className }) => {
    return <div className={`mt-4 border-t pt-3 flex justify-end ${className}`}>{children}</div>;
  };
  