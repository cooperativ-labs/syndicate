import Input, { defaultFieldDiv } from './Inputs';
import React, { FC } from 'react';
import Select from './Select';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';

type NewClassInputsProps = {
  partitions: String0x[];
  values: any /** @TODO : Shape */;
};
export const NewClassInputs: FC<NewClassInputsProps> = ({ partitions, values }) => {
  return (
    <>
      <Select className={'mt-3'} name="partition" labelText="Share class">
        <option value="">Select class</option>

        {partitions.map((partition, i) => {
          return (
            <option key={i} value={partition}>
              {stringFromBytes32(partition)}
            </option>
          );
        })}
        <hr className="bg-grey-400" />
        <option value="0xNew">+ Add new class</option>
      </Select>
      {values.partition === '0xNew' && (
        <Input
          className={defaultFieldDiv}
          labelText="New class name"
          name="newPartition"
          type="text"
          placeholder="Class A"
          required
        />
      )}
    </>
  );
};

export default NewClassInputs;
