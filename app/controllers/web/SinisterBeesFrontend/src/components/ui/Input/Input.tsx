import React, { forwardRef, useRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null); // Corrected type

    const finalRef = ref || inputRef;

    return (
      <div className=" flex  flex-col items-start">
        {label ?<label className="block mb-2 font-bold text-gray-500">{label}</label> : ""}
        <input
          ref={finalRef}
          className="w-full p-1 border border-gray-300 rounded outline-none bg-white  hover:focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...props}
          placeholder="Enter your email address"
        />
      </div>
    );
  },
);

export default Input;
