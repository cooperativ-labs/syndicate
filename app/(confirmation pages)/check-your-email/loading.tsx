import { Skeleton } from '@src/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center w-64 md:w-96 text-center p-3 rounded-lg bg-zinc-100 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

