import AlertPopup from '@src/components/alerts/AlertPopup';
import EnsureCompatibleNetwork from '@src/containers/wallet/EnsureCompatibleNetwork';
import { cn } from '@src/lib/utils';
import { Footer } from 'react-day-picker';
const BackgroundGradient = 'bg-linear-to-b from-gray-100 to-blue-50';

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
      <AlertPopup text='This is an alpha version. Please use with caution.' />
      <EnsureCompatibleNetwork>{children}</EnsureCompatibleNetwork>
      <Footer color='bg-gray-200' />
    </div>
  );
};

export default PortalLayout;
