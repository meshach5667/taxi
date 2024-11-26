import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>
  );
};

export const CardTitle: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
  );
};

export const CardDescription: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
