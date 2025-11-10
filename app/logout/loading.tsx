import { Skeleton } from '@src/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="space-y-4">
        <Skeleton className="h-8 w-32 mx-auto" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
    </div>
  );
}

