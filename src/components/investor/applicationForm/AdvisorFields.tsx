import AddressFields from '@src/components/address/AddressFields';
import React, { FC } from 'react';

import Input, { defaultFieldDiv } from '../../form-components/Inputs';

const AdvisorFields: FC = () => {
  return (
    <>
      <Input
        className={defaultFieldDiv}
        name="advisorFullName"
        type="text"
        placeholder=""
        labelText="Full name"
        required
      />
      <Input
        className={defaultFieldDiv}
        name="advisorEmail"
        type="text"
        placeholder=""
        labelText="Email address"
        required
      />
      <Input
        className={defaultFieldDiv}
        name="advisorPhone"
        type="text"
        placeholder=""
        labelText="Phone number"
        required
      />
      <AddressFields fieldNameModifier="advisor_" excludeAddressLabel />
    </>
  );
};

export default AdvisorFields;
