import FormCard from '@src/components/cards/FormCard';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import { Skeleton } from '@src/components/ui/skeleton';

export default function Loading() {
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <FormCard center>
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-32" />
          </div>
        </FormCard>
      </ManagerWrapper>
    </div>
  );
}


