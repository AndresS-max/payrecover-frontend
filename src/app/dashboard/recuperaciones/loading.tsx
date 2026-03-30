export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-60 bg-[#0D0D0D]/60 rounded-lg mb-8" />

      {/* Toolbar skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="h-7 w-52 bg-[#0D0D0D]/60 rounded-lg" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-32 bg-[#0D0D0D]/40 rounded-lg" />
          <div className="h-9 w-36 bg-[#0D0D0D]/60 rounded-lg" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-[#0D0D0D]/40 rounded-2xl border border-[#F2F2F2]/[0.07] overflow-hidden">
        {/* Table header */}
        <div className="flex gap-4 p-4 border-b border-[#F2F2F2]/[0.05]">
          <div className="h-4 w-28 bg-[#F2F2F2]/[0.06] rounded" />
          <div className="h-4 w-20 bg-[#F2F2F2]/[0.06] rounded" />
          <div className="h-4 w-24 bg-[#F2F2F2]/[0.06] rounded" />
          <div className="h-4 w-20 bg-[#F2F2F2]/[0.06] rounded" />
        </div>
        {/* Table rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-[#F2F2F2]/[0.03]">
            <div className="h-4 w-36 bg-[#F2F2F2]/[0.04] rounded" />
            <div className="h-4 w-20 bg-[#F2F2F2]/[0.04] rounded" />
            <div className="h-5 w-24 bg-[#F2F2F2]/[0.04] rounded-full" />
            <div className="h-4 w-24 bg-[#F2F2F2]/[0.04] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
