import ManagerWrapper from '@src/containers/ManagerWrapper';
const OrganizationLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      data-test="layout-organization"
      className="bg-linear-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>{children}</ManagerWrapper>
    </div>
  );
};

export default OrganizationLayout;
