interface AssetIconProps {
  src: string
  className?: string
}

export function AssetIcon({ src, className }: AssetIconProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={className}
      draggable={false}
    />
  )
}
