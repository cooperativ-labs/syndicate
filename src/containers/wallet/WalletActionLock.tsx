'use client';

export default function WalletActionLock() {
  const logo = process.env.NEXT_PUBLIC_LOGO;
  return (
    <div>
      <div className="animate-pulse">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex h-20 w-24 mb-5 md:mr-3 md:mb-0 items-center">
            <img src={logo} />
          </div>
          <div>
            <div className="ml-1 font-bold text-cDarkBlue md:text-xl">
              Communicating with the blockchain network...
            </div>
          </div>
        </div>
      </div>
      <div className="text-orange-700 font-semibold mt-5">
        Confirm this transaction in your wallet.
      </div>
      <div className="text-gray-700 mt-5">
        Please do not refresh. This can take a few minutes. You can check the status of the
        transaction in your wallet.
      </div>
    </div>
  );
}
