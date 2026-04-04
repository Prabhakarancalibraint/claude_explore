/**
 * Button - Reusable Button Component
 *
 * A versatile button component with variants, loading states, and icon support.
 * Use this artifact for RWA dashboard forms and transaction flows.
 *
 * @example
 * <Button variant="primary" onClick={handleMint}>
 *   Mint Tokens
 * </Button>
 *
 * <Button variant="danger" loading={isPending}>
 *   Confirm Transaction
 * </Button>
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  /** Button label text */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disable interactions */
  disabled?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Full width button */
  fullWidth?: boolean;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Button component with multiple variants and states
 *
 * @param props - Button configuration
 * @returns Rendered button element
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  fullWidth = false,
  icon,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  const styles = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
  ].filter(Boolean).join(' ');

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`${styles} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}

export default Button;