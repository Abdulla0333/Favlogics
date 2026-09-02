import type { ReactNode } from 'react'
import { DetailsIcon } from './DetailsIcon'

interface AccordionSectionProps {
  label: string
  open: boolean
  onToggle: () => void
  children: ReactNode
  className?: string
}

export function AccordionSection({
  label,
  open,
  onToggle,
  children,
  className = '',
}: AccordionSectionProps) {
  return (
    <section className={`details-section ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className="details-section-toggle"
        aria-expanded={open}
      >
        <span>{label}</span>
        <DetailsIcon
          name="chevron"
          className={`details-icon details-icon--chevron ${
            open ? 'details-icon--chevron-open' : ''
          }`}
        />
      </button>
      {open && <div className="details-section-body">{children}</div>}
    </section>
  )
}
