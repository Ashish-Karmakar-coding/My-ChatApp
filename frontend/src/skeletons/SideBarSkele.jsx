function SidebarSkeleton() {
  // Create an array of skeleton items to simulate multiple users
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i);

  return (
    <aside className="w-full flex-1 flex flex-col bg-[var(--bg-secondary)] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {skeletonItems.map((item) => (
          <div
            key={item}
            className="w-full flex items-center gap-4 p-4 rounded-[2.5rem] bg-[var(--bg-primary)]/50 border border-white/5"
          >
            {/* Avatar skeleton */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full premium-skeleton border border-white/5"></div>
            </div>

            {/* Text skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-4 premium-skeleton rounded-full w-24"></div>
              <div className="h-3 premium-skeleton rounded-full w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SidebarSkeleton;