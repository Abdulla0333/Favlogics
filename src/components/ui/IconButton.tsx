import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  children: ReactNode
  isActive?: boolean
}

export function IconButton({
  label,
  children,
  isActive = false,
  className = '',
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      aria-pressed={isActive}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}
