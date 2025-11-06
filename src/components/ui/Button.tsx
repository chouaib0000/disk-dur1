import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

interface LinkButtonProps extends ButtonProps {
  to: string;
}

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-blue-700 hover:bg-blue-800 text-white';
    case 'secondary':
      return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    case 'outline':
      return 'bg-transparent border border-blue-700 text-blue-700 hover:bg-blue-50';
    case 'ghost':
      return 'bg-transparent hover:bg-gray-100 text-gray-800';
    case 'link':
      return 'bg-transparent underline text-blue-700 hover:text-blue-800';
    case 'danger':
      return 'bg-red-600 hover:bg-red-700 text-white';
    default:
      return 'bg-blue-700 hover:bg-blue-800 text-white';
  }
};

const getSizeClasses = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return 'text-xs px-3 py-1.5';
    case 'md':
      return 'text-sm px-4 py-2';
    case 'lg':
      return 'text-base px-6 py-3';
    default:
      return 'text-sm px-4 py-2';
  }
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${getVariantClasses(variant)}
        ${getSizeClasses(size)}
        ${fullWidth ? 'w-full' : ''}
        inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export const LinkButton = ({
  children,
  to,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      to={to}
      className={`
        ${getVariantClasses(variant)}
        ${getSizeClasses(size)}
        ${fullWidth ? 'w-full' : ''}
        inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </Link>
  );
};