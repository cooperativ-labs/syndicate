import { Skeleton } from '@src/components/ui/skeleton';
import ManagerWrapper from '@src/containers/ManagerWrapper';

export default function Loading() {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <div className="w-full space-y-6 p-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </ManagerWrapper>
    </div>
  );
}

