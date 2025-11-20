import React, { FC } from 'react';

import { Address } from '@/types';

import { Button } from '../ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type AddressSelectorProps = {
  addresses: Address[];
  setModal: any;
  label: string;
  fieldName: string;
};

const AddressSelector: FC<AddressSelectorProps> = ({ addresses, fieldName, setModal, label }) => {
  return (
    <div className="md:grid grid-cols-5 gap-4">
      <div className="col-span-3 align-end ">
        <Select required value={fieldName} onValueChange={value => {}}>
          <SelectTrigger>
            <SelectValue placeholder="Select an address" />
          </SelectTrigger>
          <SelectContent>
            {addresses.map((address, i) => {
              return (
                <SelectItem key={i} value={address.id}>
                  {address.line1}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col col-span-2 justify-end">
        <Button
          className="p-1 px-3 border-2 border-gray-400 rounded-lg my-5"
          onClick={e => {
            e.preventDefault();
            setModal(true);
          }}
        >
          Add New Address
        </Button>
      </div>
    </div>
  );
};

export default AddressSelector;
