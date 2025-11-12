import ManagerWrapper from '@src/containers/ManagerWrapper';

const EntitiesLayout = async ({
  children
}: {
  params: Promise<{ organizationId: string }>;
  children: React.ReactNode;
}) => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>{children}</ManagerWrapper>
    </div>
  );
};

export default EntitiesLayout;
