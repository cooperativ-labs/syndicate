import Button from '@src/components/buttons/Button';
import OfferingProfileDescriptionForm from './OfferingProfileDescriptionForm';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DELETE_DESCRIPTION_TEXT, UPDATE_DESCRIPTION_TEXT } from '@src/utils/dGraphQueries/offering';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTabSectionOption } from '@src/utils/enumConverters';
import { Offering, OfferingDescriptionText, OfferingTabSection } from 'types';
import { useMutation } from '@apollo/client';

type OfferingDescriptionItemProps = {
  offering: Offering;
  description: OfferingDescriptionText;
  order: number;
  tab: OfferingTabSection;
};
const OfferingDescriptionItem: FC<OfferingDescriptionItemProps> = ({ offering, description, order, tab }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateDescription, { data: dataUpdate, error: errorUpdate }] = useMutation(UPDATE_DESCRIPTION_TEXT);
  const [deleteDescription, { data: dataDelete, error: errorDelete }] = useMutation(DELETE_DESCRIPTION_TEXT);

  const [alerted, setAlerted] = useState<boolean>(false);

  if (errorUpdate || errorDelete) {
    alert(`Oops. Looks like something went wrong: ${errorUpdate ? errorUpdate.message : errorDelete.message}`);
  }
  if ((dataUpdate && !alerted) || (dataDelete && !alerted)) {
    setAlerted(true);
  }

  return (
    <div className=" my-2 first:mt-0 p-4 border-2 bg-white border-gray-200 rounded-lg shadow-sm ">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-11">
          <div className="flex col-span-8 ">
            <div className="font-medium text-lg"> {description.title} </div>
          </div>
        </div>
        <div className="col-span-3 flex ">
          <Button
            className={`focus:outline-none pr-5 rounded-full font-semibold text-lg text-gray-700`}
            aria-label={open ? 'expand section' : 'collapse section'}
            onClick={() => setOpen(!open)}
          >
            <div className="p-1">{open ? <FontAwesomeIcon icon="close" /> : <FontAwesomeIcon icon="pen" />}</div>
          </Button>
          <div
            className={`focus:outline-none pr-2 rounded-full font-semibold text-lg text-gray-700`}
            aria-label={'drag to reorder section'}
          >
            <div className="p-1">
              <FontAwesomeIcon icon="bars" />
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <OfferingProfileDescriptionForm
            offering={offering}
            description={description}
            setAlerted={setAlerted}
            updateDescription={updateDescription}
            tab={tab}
            onSubmit={() => {
              setOpen(false);
            }}
          />
          <button
            onClick={() =>
              deleteDescription({
                variables: { offeringId: offering.id, descriptionId: description.id, currentDate: currentDate },
              })
            }
            className="p-3 border-2 border-red-800 rounded-md w-full text-red-800 font-bold uppercase -mt-10"
          >
            Delete Description
          </button>
        </div>
      )}
    </div>
  );
};

export default OfferingDescriptionItem;
