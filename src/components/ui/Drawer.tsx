import type { ReactNode } from 'react'

type DrawerVariant = 'sidebar' | 'details'

const DRAWER_CLASS: Record<DrawerVariant, string> = {
  sidebar: 'inbox-sidebar-drawer',
  details: 'details-drawer',
}

interface DrawerProps {
  variant: DrawerVariant
  open: boolean
  onClose?: () => void
  closeLabel: string
  children: ReactNode
}

export function Drawer({
  variant,
  open,
  onClose,
  closeLabel,
  children,
}: DrawerProps) {
  const baseClass = DRAWER_CLASS[variant]

  return (
    <div
      className={`${baseClass} ${open ? `${baseClass}--open` : ''}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`${baseClass}-backdrop`}
        aria-label={closeLabel}
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      {children}
    </div>
  )
}
