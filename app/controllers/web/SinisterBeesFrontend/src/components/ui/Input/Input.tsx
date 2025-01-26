import React, { forwardRef, useRef } from 'react';
import { cn } from '../../../utils/cn';
import { useTheme } from '../../../context/ThemeContext';

const inputThemes = {
  light: {
    base: 'bg-white text-gray-900 border-gray-300 hover:focus:ring-blue-400',
    focus: 'focus:ring-2 focus:ring-blue-400',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  dark: {
    base: 'bg-gray-800 text-gray-200 border-gray-600 hover:focus:ring-gray-400',
    focus: 'focus:ring-2 focus:ring-gray-400',
    disabled: 'opacity-50 cursor-not-allowed',
  },
};

const sizes = {
  sm: 'text-sm p-2',
  md: 'text-base p-3',
  lg: 'text-lg p-4',
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'base';
  className?: string;
  divClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      size = 'sm',
      variant = 'base',
      className = '',
      divClassName = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const finalRef = ref || inputRef;

    const themeClasses =
      inputThemes[theme]?.[variant] || inputThemes.light.base;
    const focusClasses = inputThemes[theme]?.focus;
    const disabledClasses = disabled ? inputThemes[theme]?.disabled : '';

    return (
      <div className={cn('flex flex-col items-start', divClassName)}>
        {label && <label className="block mb-2 font-bold">{label}</label>}
        <input
          ref={finalRef}
          className={cn(
            'w-full border rounded-md outline-none transition-all',
            sizes[size],
            themeClasses,
            focusClasses,
            disabledClasses,
            className,
          )}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  },
);

export default Input;
