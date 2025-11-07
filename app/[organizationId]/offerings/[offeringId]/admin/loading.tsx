import FormCard from '@src/components/cards/FormCard';
import { Skeleton } from '@src/components/ui/skeleton';
import ManagerWrapper from '@src/containers/ManagerWrapper';

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
          </div>
        </FormCard>
      </ManagerWrapper>
    </div>
  );
}
