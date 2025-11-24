import WithAuthentication from '@src/containers/WithAuthentication';
const OrganizationLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-test='layout-organization' className='flex flex-col w-full h-full p-8'>
      <WithAuthentication>{children}</WithAuthentication>
    </div>
  );
};

export default OrganizationLayout;
