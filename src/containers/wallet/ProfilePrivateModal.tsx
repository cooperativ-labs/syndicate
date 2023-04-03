import AccessCodeForm from '@src/components/offering/profile/AccessCodeForm';
import Card from '@src/components/cards/Card';
import cn from 'classnames';
import React, { FC, useContext, useEffect, useState } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { ApplicationStoreProps, store } from '@context/store';

type ProfilePrivateModalProps = {
  offeringId: string;
  accessCode: string;
};

const ProfilePrivateModal: FC<ProfilePrivateModalProps> = ({ offeringId, accessCode }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: setPrivacyModal, ProfilePrivateModalOn } = applicationStore;
  const [accessState, setAccessState] = useState(undefined);

  const windowSize = useWindowSize();

  const handleCodeSubmission = (code: string) => {
    if (code === accessCode) {
      setPrivacyModal({ type: 'SET_PROFILE_PRIVATE_MODAL_OFF' });
      accessState?.setItem(offeringId, accessCode);
    }
  };

  useEffect(() => {
    const pageAccess = window.localStorage?.getItem(offeringId);
    setAccessState(window.localStorage);
    if (accessCode && accessCode !== pageAccess) {
      setPrivacyModal({ type: 'SET_PROFILE_PRIVATE_MODAL_ON' });
    }
    if (ProfilePrivateModalOn && windowSize.width > 768) {
      // setScrollY(window.scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      // window.scrollTo(0, parseInt(scrollY));
    }
  }, [ProfilePrivateModalOn, windowSize, accessCode, offeringId, setPrivacyModal]);

  if (ProfilePrivateModalOn) {
    return (
      <div data-test="component-payment-send" className="">
        <div
          id="dialog-curtain"
          className={cn(
            // noModal
            //   ? 'absolute top-0 bottom-0 right-0 left-0 md:relative'
            // :
            'w-screen md:h-screen absolute top-0 bottom-0 right-0 left-0 md:flex justify-center items-center z-50 bg-gray-500 bg-opacity-20 md:bg-opacity-80 backdrop-blur-md '
          )}
        >
          <Card
            className="mx-4 p-6 absolute right-0 left-0 top-32 md:top-0 md:relative flex-col md:w-96  rounded-xl md:rounded-lg shadow-modal"
            style={{ overflow: 'smooth' }}
          >
            <div>
              <div className="">
                <div className="flex flex-col md:flex-row items-center">
                  <div>
                    <div className="ml-1 font-bold text-cDarkBlue md:text-xl animate-pulse mb-3 ">
                      Enter your access code.
                    </div>
                  </div>
                </div>
                <AccessCodeForm accessCode={accessCode} handleCodeSubmission={handleCodeSubmission} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  return <></>;
};

export default ProfilePrivateModal;
