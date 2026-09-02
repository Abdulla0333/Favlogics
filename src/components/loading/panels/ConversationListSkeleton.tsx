import { SkeletonBlock } from '../SkeletonBlock'

function ConversationRowSkeleton({
  nameWidth = 'w-10',
  previewWidth = 'w-[137px]',
}: {
  nameWidth?: string
  previewWidth?: string
}) {
  return (
    <div className="conversation-skeleton-row">
      <SkeletonBlock className="conversation-skeleton-avatar" />
      <div className="conversation-skeleton-copy">
        <div className="conversation-skeleton-top">
          <SkeletonBlock className={`h-1.5 ${nameWidth}`} />
          <SkeletonBlock className="h-1.5 w-4 shrink-0" />
        </div>
        <SkeletonBlock className={`h-1.5 ${previewWidth}`} />
      </div>
    </div>
  )
}

export function ConversationListSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="conversation-list-skeleton" aria-busy="true" aria-label="Loading conversations">
      {Array.from({ length: rows }).map((_, index) => (
        <ConversationRowSkeleton
          key={index}
          nameWidth={index % 3 === 0 ? 'w-14' : 'w-10'}
          previewWidth={index % 2 === 0 ? 'w-[137px]' : 'w-[110px]'}
        />
      ))}
    </div>
  )
}
