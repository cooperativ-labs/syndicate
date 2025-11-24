import AlertPopup from '@src/components/alerts/AlertPopup';
import ChainCompatibilityAlert from '@src/components/alerts/ChainCompatibilityAlert';
import { Toaster } from '@src/components/ui/sonner';
import NewOrganizationModal from '@src/containers/NewOrganizationModal';
import WalletActionLockModel from '@src/containers/wallet/WalletActionLockModel';
import { WalletChooserModal } from '@src/containers/wallet/WalletChooserModel';
export default function ModalsAndAlerts() {
  return (
    <>
      <WalletChooserModal />
      <WalletActionLockModel />
      {/* {PageIsLoading && <LoadingModal />} */}
      <Toaster />
      <ChainCompatibilityAlert />
      <AlertPopup text='This is an alpha version. Please use with caution.' />
    </>
  );
}
