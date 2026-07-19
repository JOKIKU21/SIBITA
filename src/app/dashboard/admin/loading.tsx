export default function AdminDashboardLoading() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 w-48 bg-neutral-200 rounded-lg mb-2" />
          <div className="h-4.5 w-80 bg-neutral-100 rounded-md" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          {/* Stat Cards Skeleton */}
          <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-white border border-neutral-border rounded-3.5" />
            ))}
          </div>

          {/* Dosen Bimbingan List Skeleton */}
          <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-5 pb-4">
              <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Dosen & Bimbingan</h3>
              <span className="text-[13px] text-brand font-semibold">
                Kelola →
              </span>
            </div>

            <div className="px-6 pb-5 flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        {/* Name skeleton */}
                        <div className="h-4 w-32 bg-neutral-200 rounded mb-1.5" />
                        {/* Department skeleton */}
                        <div className="h-3 w-24 bg-neutral-100 rounded" />
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        {/* Advisee count skeleton */}
                        <div className="h-4 w-12 bg-neutral-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
