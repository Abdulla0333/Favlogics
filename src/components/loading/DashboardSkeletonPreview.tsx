import { SkeletonBlock } from "./SkeletonBlock";
import { BubbleSkeleton } from "./BubbleSkeleton";

function ConversationSkeletonRow({
  nameWidth = "w-10",
  previewWidth = "w-[137px]",
}: {
  nameWidth?: string;
  previewWidth?: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-[#f3f4f6] px-3 py-2.5">
      <SkeletonBlock className="h-5 w-5 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <SkeletonBlock className={`h-1.5 ${nameWidth}`} />
          <SkeletonBlock className="h-1.5 w-4 shrink-0" />
        </div>
        <SkeletonBlock className={`h-1.5 ${previewWidth}`} />
      </div>
    </div>
  );
}

const NAV_PILL_WIDTHS = [
  "w-[62px]",
  "w-[72px]",
  "w-[96px]",
  "w-[80px]",
  "w-[80px]",
] as const;

function NavbarSkeleton() {
  return (
    <header className="dashboard-navbar-skeleton flex h-12 shrink-0 items-center justify-between overflow-hidden rounded-t-[10px] border-b border-[#eceef2] bg-white px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-4 sm:gap-6">
        <SkeletonBlock className="h-7 w-[68px] shrink-0 rounded-md sm:h-8 sm:w-[76px]" />

        <nav className="flex items-center gap-1 overflow-x-auto lg:hidden">
          {NAV_PILL_WIDTHS.slice(0, 3).map((width, index) => (
            <SkeletonBlock
              key={index}
              className={`h-7 shrink-0 rounded-md ${width}`}
            />
          ))}
        </nav>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_PILL_WIDTHS.map((width, index) => (
            <SkeletonBlock
              key={index}
              className={`h-7 shrink-0 rounded-md ${width}`}
            />
          ))}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <SkeletonBlock className="h-7 w-7 shrink-0 rounded-md" />
        <div className="flex items-center gap-1.5 rounded-full border border-[#eceef2] bg-white py-0.5 pl-0.5 pr-2.5">
          <SkeletonBlock className="h-5 w-5 shrink-0 rounded-full" />
          <SkeletonBlock className="hidden h-3 w-[88px] sm:block" />
        </div>
      </div>
    </header>
  );
}

export function DashboardSkeletonPreview() {
  return (
    <div className="skeleton-dashboard-preview flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden rounded-t-[10px] bg-white max-lg:rounded-none">
      <NavbarSkeleton />

      <div className="dashboard-canvas flex min-h-0 flex-1 gap-1.5 p-1.5 sm:gap-2 sm:p-2">
        {/* Inbox sidebar */}
        <aside className="dashboard-panel hidden h-full w-[168px] shrink-0 flex-col p-3 lg:flex">
          <SkeletonBlock className="mb-3 h-2.5 w-10" />
          <div className="space-y-1">
            <SkeletonBlock className="h-6 w-full" />
            <SkeletonBlock className="h-6 w-full bg-[#dbdbdb]" />
            <SkeletonBlock className="h-6 w-full" />
          </div>
          <SkeletonBlock className="mb-2 mt-4 h-2.5 w-12" />
          <div className="space-y-1">
            <SkeletonBlock className="h-6 w-full" />
            <SkeletonBlock className="h-6 w-full" />
          </div>
          <SkeletonBlock className="mb-2 mt-4 h-2.5 w-10" />
          <div className="space-y-0.5">
            {[
              { name: "w-[72px]", count: true },
              { name: "w-[80px]", count: true, active: true },
              { name: "w-[56px]", count: false },
              { name: "w-[88px]", count: true },
              { name: "w-[72px]", count: true },
              { name: "w-[76px]", count: false },
            ].map((row, index) => (
              <div
                key={index}
                className={`flex items-center justify-between gap-1 rounded-lg px-1.5 py-1 ${
                  row.active
                    ? "border border-[#e5e7eb] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
                    : ""
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  <SkeletonBlock className="h-3.5 w-3.5 shrink-0 rounded-full" />
                  <SkeletonBlock className={`h-1.5 ${row.name}`} />
                </div>
                {row.count && (
                  <SkeletonBlock className="h-1.5 w-2.5 shrink-0" />
                )}
              </div>
            ))}
          </div>
          <SkeletonBlock className="mb-2 mt-4 h-2.5 w-14" />
          <SkeletonBlock className="h-6 w-full" />
        </aside>

        {/* Conversation list */}
        <section className="dashboard-panel flex h-full w-full min-w-0 flex-1 flex-col lg:w-[250px] lg:flex-none lg:shrink-0">
          <div className="border-b border-[#eceef2] px-3 py-2">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SkeletonBlock className="h-4 w-4 rounded-full" />
                <SkeletonBlock className="h-2.5 w-20" />
              </div>
              <SkeletonBlock className="h-4 w-4 rounded-md" />
            </div>
            <SkeletonBlock className="mb-2 h-7 w-full rounded-md" />
            <div className="flex items-center justify-between">
              <SkeletonBlock className="h-2.5 w-10" />
              <SkeletonBlock className="h-2.5 w-10" />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            {Array.from({ length: 8 }).map((_, index) => (
              <ConversationSkeletonRow
                key={index}
                nameWidth={index % 3 === 0 ? "w-14" : "w-10"}
                previewWidth={index % 2 === 0 ? "w-[137px]" : "w-[110px]"}
              />
            ))}
          </div>
        </section>

        {/* Chat panel */}
        <section className="dashboard-panel hidden h-full min-w-0 flex-1 flex-col lg:flex">
          <div className="flex h-10 items-center justify-between border-b border-[#eceef2] px-3">
            <SkeletonBlock className="h-2.5 w-20" />
            <div className="flex items-center gap-1.5">
              <SkeletonBlock className="h-5 w-5 rounded-md" />
              <SkeletonBlock className="h-5 w-5 rounded-md" />
              <SkeletonBlock className="h-5 w-5 rounded-md" />
            </div>
          </div>
          <div className="flex-1 space-y-3 bg-[#fafbfc] px-3 py-3">
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
          <div className="border-t border-[#eceef2] bg-white p-2">
            <SkeletonBlock className="mb-2 h-8 w-full rounded-md" />
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock
                    key={index}
                    className="h-3.5 w-3.5 rounded-sm"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <SkeletonBlock className="h-3.5 w-3.5 rounded-sm" />
                <SkeletonBlock className="h-3.5 w-3.5 rounded-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Details panel */}
        <aside className="dashboard-panel hidden h-full w-[250px] shrink-0 flex-col xl:flex xl:w-[294px]">
          <div className="flex h-10 items-center justify-between border-b border-[#eceef2] px-4 py-2.5">
            <SkeletonBlock className="h-3 w-12" />
            <SkeletonBlock className="h-4 w-4 rounded-md" />
          </div>
          <div className="flex-1 space-y-0 px-4 py-3">
            {[
              { title: "w-16", rows: 2 },
              { title: "w-20", rows: 4 },
              { title: "w-20", rows: 0, pills: true },
              { title: "w-10", rows: 0, notes: true },
              { title: "w-16", rows: 0, chat: true },
            ].map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={`${sectionIndex === 0 ? "" : "border-t border-[#eceef2]"} py-3`}
              >
                <SkeletonBlock className={`mb-2 h-2.5 ${section.title}`} />
                {section.rows > 0 && (
                  <div className="space-y-2">
                    {Array.from({ length: section.rows }).map((_, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <SkeletonBlock className="h-2 w-[84px] shrink-0" />
                        <SkeletonBlock className="h-2.5 w-20" />
                      </div>
                    ))}
                  </div>
                )}
                {section.pills && (
                  <div className="flex gap-1.5 pt-1">
                    <SkeletonBlock className="h-4 w-16 rounded-full" />
                    <SkeletonBlock className="h-4 w-12 rounded-full" />
                  </div>
                )}
                {section.notes && (
                  <div className="space-y-1.5 pt-1">
                    <SkeletonBlock className="h-7 w-full rounded-md" />
                    <SkeletonBlock className="h-7 w-full rounded-md" />
                  </div>
                )}
                {section.chat && (
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
        </aside>
      </div>
    </div>
  );
}
