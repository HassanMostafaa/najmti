import React, { useEffect, useState } from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  required = false,
  className = "",
  wrapperClassName = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    setIsFloating(isFocused || value.length > 0);
  }, [value, isFocused]);

  return (
    <div className={`relative ${wrapperClassName}`}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={`
          block w-full px-0 py-2 border-b border-gray-300 
          focus:outline-none focus:ring-0 bg-transparent ${className}
        `}
        placeholder=" " // Required for spacing consistency
      />
      <label
        htmlFor={id}
        className={`
          absolute left-0 transition-all duration-200 ease-in-out text-gray-500
          pointer-events-none
          ${isFloating ? "text-xs -top-3 text-neutral-500" : "text-sm top-2"}
        `}
      >
        {label}
      </label>
    </div>
  );
};
