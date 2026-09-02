import { SkeletonBlock } from '../SkeletonBlock'

const SECTIONS = [
  { title: 'w-16', rows: 2 },
  { title: 'w-20', rows: 4 },
  { title: 'w-20', pills: true },
  { title: 'w-10', notes: true },
  { title: 'w-16', chat: true },
] as const

export function DetailsPanelSkeleton() {
  return (
    <div className="details-panel-skeleton" aria-busy="true" aria-label="Loading contact details">
      {SECTIONS.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className={`details-panel-skeleton-section ${sectionIndex > 0 ? 'details-panel-skeleton-section--bordered' : ''}`}
        >
          <SkeletonBlock className={`mb-2 h-2.5 ${section.title}`} />
          {'rows' in section && section.rows > 0 && (
            <div className="space-y-2">
              {Array.from({ length: section.rows }).map((_, index) => (
                <div key={index} className="flex items-start gap-4">
                  <SkeletonBlock className="h-2 w-[84px] shrink-0" />
                  <SkeletonBlock className="h-2.5 w-20" />
                </div>
              ))}
            </div>
          )}
          {'pills' in section && section.pills && (
            <div className="flex gap-1.5 pt-1">
              <SkeletonBlock className="h-4 w-16 rounded-full" />
              <SkeletonBlock className="h-4 w-12 rounded-full" />
            </div>
          )}
          {'notes' in section && section.notes && (
            <div className="space-y-1.5 pt-1">
              <SkeletonBlock className="h-7 w-full rounded-md" />
              <SkeletonBlock className="h-7 w-full rounded-md" />
            </div>
          )}
          {'chat' in section && section.chat && (
            <div className="flex items-start gap-2 pt-1">
              <SkeletonBlock className="h-4 w-4 shrink-0 rounded-[4px]" />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between gap-2">
                  <SkeletonBlock className="h-2 w-10" />
                  <SkeletonBlock className="h-2 w-8" />
                </div>
                <SkeletonBlock className="h-2 w-14" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
