import OfferingDescriptionItem from './OfferingDescriptionItem';
import OfferingProfileDescriptionForm from './OfferingProfileDescriptionForm';
import React, { FC, useState } from 'react';
import { CREATE_DESCRIPTION_TEXT } from '@src/utils/dGraphQueries/offering';
import { Offering } from 'types';
import { useMutation } from '@apollo/client';

type OfferingDescriptionSettingsProps = {
  offering: Offering;
};
const OfferingDescriptionSettings: FC<OfferingDescriptionSettingsProps> = ({ offering }) => {
  const [addDescription, { data: dataAdd, error: errorAdd }] = useMutation(CREATE_DESCRIPTION_TEXT);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (errorAdd) {
    alert('Oops. Looks like something went wrong');
  }
  if (dataAdd && !alerted) {
    setAlerted(true);
  }

  const existingDescriptions = offering.profileDescriptions.map((description, i) => (
    <OfferingDescriptionItem key={i} offering={offering} description={description} />
  ));
  return (
    <div>
      <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Offering descriptions</h2>
      {existingDescriptions}
      <OfferingProfileDescriptionForm offering={offering} setAlerted={setAlerted} addDescription={addDescription} />
    </div>
  );
};

export default OfferingDescriptionSettings;
