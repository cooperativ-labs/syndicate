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
            <div data-test="investor-application" className="w-screen h-full pb-10 md:pb-20">
              <div className="md:mx-6 w-full">
                <div className="grow h-full z-10">
                  <div className="h-full px-2 py-2 md:mt-4">
                    <div className="mx-auto min-h-full space-y-6">
                      <Skeleton className="h-10 w-64" />
                      <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

