import AddressSelector from '../../form-components/AddressSelector';
import Checkbox from '@src/components/form-components/Checkbox';
import CreateAddress from '@src/components/address/CreateAddress';
import Input, { defaultFieldDiv } from '../../form-components/Inputs';
import React, { FC } from 'react';
import Select from '../../form-components/Select';
import { entityNotHuman } from '@src/utils/helpersUserAndEntity';
import { LegalEntity } from 'types';

type PrimaryApplicationFieldsProps = {
  isNonHuman: boolean;
};

const PrimaryApplicationFields: FC<PrimaryApplicationFieldsProps> = ({ isNonHuman }) => {
  return (
    <>
      {isNonHuman && (
        <>
          <Select
            required
            className={defaultFieldDiv}
            labelText="How are these units being purchased?"
            name="purchaseMethod"
          >
            <option value="">Select</option>
            <option value="Company">Company</option>
            <option value="Trust">Trust</option>
            <option value="Traditional individual retirement account">Traditional individual retirement account</option>
            <option value="Roth IRA">Roth IRA</option>
            <option value="Pensions or profit-sharing trust">Pensions or profit-sharing trust</option>
            <option value="Custodian for Minor">Custodian for Minor</option>
            <option value="Employee Benefit Plan">Employee Benefit Plan</option>
            <option value="Kheogh Plan">Kheogh Plan</option>
            <option value="SEP retirement account">SEP retirement account</option>
          </Select>
          <Input
            className={defaultFieldDiv}
            labelText={`Name of purchasing entity manager`}
            name="purchaserEntityManager"
            placeholder="e.g. Moritz Zimmerman"
            required
          />
          <Input
            className={defaultFieldDiv}
            labelText={`Title of manager`}
            name="purchaserEntityManagerTitle"
            placeholder="e.g. President"
            required
          />
        </>
      )}
      {!isNonHuman && (
        <Input
          className={defaultFieldDiv}
          labelText={`In which state, if any, do you pay income tax?`}
          name="purchaserTaxState"
          placeholder="e.g. Florida"
          required
        />
      )}
      {/* <Input
            className={defaultFieldDiv}
            labelText={`${isNonHuman ? `Tax ID` : `Social Security Number`}`}
            name="taxId"
            placeholder={`e.g. ${isNonHuman ? `85-9940320 ` : `052-98-4444`}`}
            required
          /> */}
    </>
  );
};

export default PrimaryApplicationFields;
