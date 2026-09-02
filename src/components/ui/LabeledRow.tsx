import type { ReactNode } from 'react'

interface LabeledRowProps {
  label: string
  value?: string
  children?: ReactNode
  valueWeight?: 'regular' | 'medium' | 'semibold'
}

export function LabeledRow({
  label,
  value,
  children,
  valueWeight = 'medium',
}: LabeledRowProps) {
  return (
    <div className="details-row">
      <span className="details-row-label">{label}</span>
      {children ? (
        <div className="details-row-value details-row-value--with-icon">{children}</div>
      ) : (
        <span className={`details-row-value details-row-value--${valueWeight}`}>
          {value}
        </span>
      )}
    </div>
  )
}
