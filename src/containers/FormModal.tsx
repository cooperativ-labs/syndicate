import Card from '@src/components/cards/Card';
import CloseButton from '@src/components/buttons/CloseButton';
import cn from 'classnames';
import React, { FC, ReactChild } from 'react';
import useWindowSize from '@hooks/useWindowSize';

type FormModalProps = {
  noModal?: boolean;
  formOpen: boolean;
  title?: string;
  subTitle?: string;
  onClose: () => void;
  children: ReactChild;
};

const FormModal: FC<FormModalProps> = ({ noModal, formOpen, title, subTitle, onClose, children }) => {
  const windowSize = useWindowSize();
  // useEffect(() => {
  //   if (formOpen && windowSize.width > 768) {
  //     // setScrollY(window.scrollY);
  //     document.body.style.position = '';
  //     document.body.style.top = '';
  //   } else {
  //     // const scrollY = document.body.style.top;
  //     document.body.style.position = '';
  //     document.body.style.top = '';
  //     // window.scrollTo(0, parseInt(scrollY));
  //   }
  // }, [formOpen]);

  if (formOpen) {
    return (
      <div data-test="component-create-entity-modal">
        <div
          id="dialog-curtain"
          className={cn(
            noModal
              ? 'fixed top-0 bottom-0 right-0 left-0 md:relative'
              : 'w-screen md:h-screen fixed top-0 bottom-0 right-0 left-0 md:flex justify-center items-center z-50 bg-gray-500 bg-opacity-20 md:bg-opacity-80 overflow-y-scroll'
          )}
        >
          <div className="absolute right-0 left-0 top-32 ">
            <Card
              className="relative mx-4 p-6 mb-10 flex-col md:mx-auto rounded-xl md:rounded-lg shadow-modal "
              style={{ overflow: 'smooth', maxWidth: '800px' }}
            >
              <div className="absolute -top-1 right-0">
                <CloseButton onClose={onClose} />
              </div>
              {title && (
                <>
                  <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">{title}</h2>
                  <h3 className="text-sm mt-1 text-gray-600 ">{subTitle}</h3>
                  <hr className="mb-6 mt-3" />
                </>
              )}
              {children}
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default FormModal;
