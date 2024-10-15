import { Nav, Sidebar } from '@/components';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <div className="flex">
        <Sidebar />
        <div className="p-3 w-full overflow-x-hidden">{children}</div>
      </div>
    </>
  );
};

MainLayout.displayName = 'MainLayout';
