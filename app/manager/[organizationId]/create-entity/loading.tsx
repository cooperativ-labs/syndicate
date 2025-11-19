import { Skeleton } from '@src/components/ui/skeleton';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';

export default function Loading() {
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <LimitedWidthSection center>
        <Skeleton className="h-6 w-64 mb-6" />
        <hr className="my-6" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-32" />
        </div>
      </LimitedWidthSection>
    </div>
  );
}
