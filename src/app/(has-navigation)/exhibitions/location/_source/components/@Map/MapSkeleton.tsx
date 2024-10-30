export function MapSkeleton() {
  return (
    <div className="relative h-screen w-full animate-pulse bg-gray-200">
      <div className="absolute bottom-4 right-4 h-20 w-8 rounded bg-gray-300" />
      <div className="absolute right-4 top-4 size-8 rounded bg-gray-300" />
      <div className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300">
        <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400" />
      </div>
    </div>
  )
}
