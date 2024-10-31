import { Skeleton } from '@/components/ui/skeleton'

const ExhibitionSkeleton = () => (
  <div className="rounded-lg border p-4">
    <div className="flex items-start gap-4">
      <Skeleton className="size-20 rounded-md" />
      <div className="flex-1">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/2" />
        <Skeleton className="mt-2 h-4 w-1/3" />
        <Skeleton className="mt-2 h-4 w-2/3" />
      </div>
      <Skeleton className="size-6" />
    </div>
  </div>
)

export default ExhibitionSkeleton
