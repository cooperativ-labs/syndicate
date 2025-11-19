export default async function EntityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-test="layout-entity" className="flex flex-col w-full h-full mx-auto p-8">
      <div style={{ maxWidth: '1580px' }}> {children}</div>
    </div>
  );
}
