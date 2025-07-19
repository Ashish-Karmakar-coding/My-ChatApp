function SidebarSkeleton() {
  // Create an array of skeleton items to simulate multiple users
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  return (
    <>
      <aside className="bg-gray-800 text-white w-64 flex flex-col border-r border-gray-700 sticky top-0 h-[92dvh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {skeletonItems.map((item) => (
            <div
              key={item}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-700 animate-pulse"
            >
              {/* Avatar skeleton - exact match */}
              <div className="relative mx-auto lg:mx-0">
                <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-purple-600"></div>
                {/* Sometimes show online indicator skeleton */}
                {item % 3 === 0 && (
                  <span className="absolute bottom-0 right-0 size-3 bg-gray-600 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>
              
              {/* Username skeleton - exact match */}
              <div className="flex flex-col items-start">
                <div className="h-4 bg-gray-600 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #2d3748;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2d3748;
          border-radius: 8px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #2d3748 #2d3748;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}

export default SidebarSkeleton;