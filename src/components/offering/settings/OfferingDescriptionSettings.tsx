import AddItemButton from '@src/components/buttons/AddItemButton';
import CloseButton from '@src/components/buttons/CloseButton';
import Card from '@src/components/cards/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { tabSectionOptions } from '@src/utils/enumConverters';
import React, { FC, useState } from 'react';

import { OfferingFull, OfferingTabSection, OfferingTabSectionTypes } from '@/types';

import OfferingProfileDescriptionForm from './OfferingProfileDescriptionForm';
import TabDescriptionList from './OfferingTabDescriptionList';

type OfferingDescriptionSettingsProps = {
  offering: OfferingFull;
};
const OfferingDescriptionSettings: FC<OfferingDescriptionSettingsProps> = ({ offering }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<OfferingTabSectionTypes | undefined>(undefined);

  const tabSectionOptionsOhneFinancials = tabSectionOptions.filter(
    option => option.value !== OfferingTabSection.FINANCIALS
  );

  const addNewDescription = (
    <div>
      {selectedTab &&
        (showForm ? (
          <Card className=" p-4 border-2 rounded-lg bg-white ">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-lg">Add description</h2>
              <CloseButton
                onClick={() => {
                  setShowForm(false);
                }}
              />
            </div>
            <div>
              <OfferingProfileDescriptionForm
                offering={offering}
                tab={selectedTab}
                onSubmit={() => {
                  setShowForm(false);
                }}
              />
            </div>
          </Card>
        ) : (
          <AddItemButton
            classNames="p-3 w-full border-gray-600 text-gray-600 hover:border-gray-900 hover:text-gray-900"
            text="Add Description"
            onClick={() => setShowForm(true)}
          />
        ))}
    </div>
  );

  return (
    <div>
      <h2 className="text-lg mb-4 md:mt-8 font-semibold">Profile tabs</h2>
      <div className="p-3 bg-gray-50 rounded-lg flex flex-col gap-4">
        <Select
          aria-label="Which tab"
          required
          name="section"
          onValueChange={value => {
            setSelectedTab(value as OfferingTabSectionTypes);
          }}
        >
          <SelectTrigger className="w-fit bg-white">
            <SelectValue placeholder="Select a tab" />
          </SelectTrigger>
          <SelectContent>
            {tabSectionOptionsOhneFinancials.map((section, i) => {
              return (
                <SelectItem key={i} value={section.value}>
                  {section.name} Tab
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {selectedTab && <TabDescriptionList offering={offering} tab={selectedTab} />}
        {addNewDescription}
      </div>
    </div>
  );
};

export default OfferingDescriptionSettings;
