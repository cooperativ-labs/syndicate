import { Skeleton } from '@src/components/ui/skeleton';
import ManagerWrapper from '@src/containers/ManagerWrapper';

export default function Loading() {
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <div className="w-full space-y-6 p-6">
          <Skeleton className="h-10 w-64" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </ManagerWrapper>
    </div>
  );
}
