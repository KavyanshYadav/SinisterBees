import { cn } from '../../../utils/cn';
import { useTheme } from '../../../context/ThemeContext';
import React from 'react';

const buttonThemes = {
  light: {
    primary: 'bg-transparent text-notion-light-textPrimary text-notion-light-textSecondary  px-2 py-1  hover:bg-notion-light-hover ',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 border border-solid border-notion-light-accent',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  },
  dark: {
    primary: 'bg-transparent text-white px-2 py-1 text-white hover:bg-notion-dark-hover ',
    secondary: 'bg-gray-700 text-gray-300 hover:bg-gray-600',
    danger: 'bg-red-700 text-white hover:bg-red-800',
  },
};

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

interface ButtonPropsType {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?:React.ReactNode
  className?: string;
  divClassName?:string, 
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonPropsType>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      className = '',
      onClick,
      icon,
      divClassName,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const isDisabled = disabled ? 'opacity-50 cursor-not-allowed' : '';
    const themeClasses =
      buttonThemes[theme]?.[variant] || buttonThemes.light.primary;

    return (
   

      <button
        className={cn(
          'inline-flex p-0 items-center   justify-center rounded-md font-medium transition-all',
          sizes[size],
          themeClasses,
          isDisabled,
          className,
        )}
        ref={ref}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        {...props}
        > 
        {children}
        {icon}
      </button>
   
    );
  },
);

export default Button;
