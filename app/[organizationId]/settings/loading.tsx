import ManagerWrapper from '@src/containers/ManagerWrapper';
import { Skeleton } from '@src/components/ui/skeleton';

export default function Loading() {
  return (
    <div
      data-test="component-landing"
      className="bg-linear-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <div className="w-full space-y-6 p-6">
          <Skeleton className="h-10 w-48" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </ManagerWrapper>
    </div>
  );
}


