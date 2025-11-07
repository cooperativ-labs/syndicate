import { Skeleton } from '@src/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="p-4 mx-auto max-w-xl bg-white rounded-xl shadow-lg space-y-4">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}


