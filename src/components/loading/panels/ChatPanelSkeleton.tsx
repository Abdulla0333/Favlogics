import { SkeletonBlock } from '../SkeletonBlock'
import { BubbleSkeleton } from '../BubbleSkeleton'

export function ChatPanelSkeleton() {
  return (
    <div className="chat-panel-skeleton" aria-busy="true" aria-label="Loading messages">
      <div className="flex justify-center">
        <SkeletonBlock className="h-5 w-24 rounded-md" />
      </div>
      <BubbleSkeleton align="left" width="w-[58%]" />
      <BubbleSkeleton align="right" width="w-[52%]" />
      <BubbleSkeleton align="left" width="w-[42%]" />
      <BubbleSkeleton align="right" width="w-[48%]" />
      <BubbleSkeleton align="left" width="w-[36%]" />
      <BubbleSkeleton align="right" width="w-[62%]" />
      <BubbleSkeleton align="left" width="w-[44%]" />
    </div>
  )
}

export function ChatComposerSkeleton() {
  return (
    <div className="chat-composer-skeleton" aria-hidden>
      <SkeletonBlock className="mb-2 h-8 w-full rounded-md" />
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-3.5 w-3.5 rounded-sm" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-3.5 w-3.5 rounded-sm" />
          <SkeletonBlock className="h-3.5 w-3.5 rounded-sm" />
        </div>
      </div>
    </div>
  )
}
