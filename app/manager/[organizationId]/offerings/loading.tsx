import { Skeleton } from '@src/components/ui/skeleton';

export default function Loading() {
  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <div className="w-full space-y-6 p-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
