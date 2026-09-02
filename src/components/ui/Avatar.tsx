const FIGMA_PALETTE = [
  '#a592f5',
  '#fbd966',
  '#99bbf6',
  '#ef9d7e',
  '#fbd966',
  '#ef9d7e',
  '#a592f5',
  '#fbd966',
  '#99bbf6',
] as const

interface AvatarProps {
  name: string
  colorIndex?: number
  className?: string
}

export function Avatar({ name, colorIndex, className = '' }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || '?'
  const index =
    colorIndex ?? initial.charCodeAt(0) % FIGMA_PALETTE.length
  const background = FIGMA_PALETTE[index % FIGMA_PALETTE.length] ?? FIGMA_PALETTE[0]

  return (
    <span
      className={`conversation-avatar ${className}`}
      style={{ backgroundColor: background }}
    >
      {initial}
    </span>
  )
}
