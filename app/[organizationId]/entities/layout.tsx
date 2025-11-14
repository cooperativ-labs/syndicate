import WithAuthentication from '@src/containers/WithAuthentication';

const EntitiesLayout = async ({
  children
}: {
  params: Promise<{ organizationId: string }>;
  children: React.ReactNode;
}) => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <WithAuthentication>{children}</WithAuthentication>
    </div>
  );
};

export default EntitiesLayout;
