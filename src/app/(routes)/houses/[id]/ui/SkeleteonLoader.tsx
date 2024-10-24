import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      <div className="sm:col-span-1 lg:col-span-7">
        <Skeleton className="h-[50vh] md:h-[70vh] lg:h-[95vh] w-full" />
      </div>
      <div className="sm:col-span-1 lg:col-span-5 px-2 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}