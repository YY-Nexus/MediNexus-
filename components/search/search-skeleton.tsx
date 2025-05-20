import { Skeleton } from "@/components/ui/skeleton"

export function SearchSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-20" />
      </div>

      <div className="flex justify-between">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="p-4 border rounded-lg space-y-2">
              <Skeleton className="h-6 w-2/5" />
              <Skeleton className="h-4 w-4/5" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
