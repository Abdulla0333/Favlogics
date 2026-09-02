import { SkeletonBlock } from './SkeletonBlock'

interface BubbleSkeletonProps {
  align: 'left' | 'right'
  width: string
}

export function BubbleSkeleton({ align, width }: BubbleSkeletonProps) {
  return (
    <div className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
      <SkeletonBlock className={`h-8 rounded-lg ${width}`} />
    </div>
  )
}
