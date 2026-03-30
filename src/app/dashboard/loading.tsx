export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="h-8 w-48 bg-[#0D0D0D]/60 rounded-lg mb-2" />
          <div className="h-4 w-64 bg-[#0D0D0D]/40 rounded-lg" />
        </div>
        <div className="h-10 w-40 bg-[#0D0D0D]/60 rounded-xl" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-[#0D0D0D]/60 p-6 rounded-2xl border border-[#F2F2F2]/[0.07]"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="h-3 w-28 bg-[#F2F2F2]/[0.06] rounded" />
              <div className="w-7 h-7 bg-[#F2F2F2]/[0.06] rounded-lg" />
            </div>
            <div className="h-8 w-24 bg-[#F2F2F2]/[0.08] rounded-lg mb-2" />
            <div className="h-3 w-32 bg-[#F2F2F2]/[0.04] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
