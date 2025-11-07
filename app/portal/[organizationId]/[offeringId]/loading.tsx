import { Skeleton } from '@src/components/ui/skeleton';

// Note: PortalWrapper requires organization prop, but loading.tsx can't receive props
// This matches the PortalWrapper structure without the wrapper
export default function Loading() {
  return (
    <div className="h-full">
      <div className="bg-linear-to-b from-gray-100 to-blue-50 w-screen min-h-screen">
        <div className="flex">
          <div className="flex z-30 md:z-10 min-h-screen"></div>
          <div className="w-full">
            <div className="h-16 border-b">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="grow z-10">
              <div className="mx-auto w-full space-y-6 p-6">
                <Skeleton className="h-10 w-64" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-96 w-full" />
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-48 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
