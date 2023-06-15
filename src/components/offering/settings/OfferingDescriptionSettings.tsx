import OfferingDescriptionItem from './OfferingDescriptionItem';
import OfferingProfileDescriptionForm from './OfferingProfileDescriptionForm';
import React, { FC, useState } from 'react';
import { CREATE_DESCRIPTION_TEXT } from '@src/utils/dGraphQueries/offering';
import { Offering, OfferingTabSection } from 'types';
import { useMutation } from '@apollo/client';

import AddItemButton from '@src/components/buttons/AddItemButton';
import Card from '@src/components/cards/Card';
import CloseButton from '@src/components/buttons/CloseButton';
import { tabSectionOptions } from '@src/utils/enumConverters';

import TabDescriptionList from './OfferingTabDescriptionList';
import toast from 'react-hot-toast';

type OfferingDescriptionSettingsProps = {
  offering: Offering;
};
const OfferingDescriptionSettings: FC<OfferingDescriptionSettingsProps> = ({ offering }) => {
  const [addDescription, { data: dataAdd, error: errorAdd }] = useMutation(CREATE_DESCRIPTION_TEXT);
  const [alerted, setAlerted] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<OfferingTabSection>(OfferingTabSection.Details);

  if (errorAdd) {
    toast.error('Oops. Looks like something went wrong');
  }
  if (dataAdd && !alerted) {
    setAlerted(true);
  }

  const tabSectionOptionsOhneFinancials = tabSectionOptions.filter(
    (option) => option.value !== OfferingTabSection.Financials
  );

  const addNewDescription = (
    <div className="mt-8">
      {selectedTab &&
        (showForm ? (
          <Card className=" p-4 border-2 rounded-lg ">
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
                setAlerted={setAlerted}
                addDescription={addDescription}
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
      <h2 className="text-xl mb-4 md:mt-8 text-blue-900 font-semibold">Profile tabs</h2>
      <div className="p-3 bg-gray-100 rounded-lg">
        <select
          className="pt-3 mb-4 pr-10 ext-sm bg-white p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          aria-label="Which tab"
          required
          name="section"
          onChange={(e) => {
            setSelectedTab(e.target.value as OfferingTabSection);
          }}
        >
          {tabSectionOptionsOhneFinancials.map((section, i) => {
            return (
              <option key={i} value={section.value}>
                {section.name} Tab
              </option>
            );
          })}
        </select>

        {selectedTab && <TabDescriptionList offering={offering} tab={selectedTab} />}
        {addNewDescription}
      </div>
    </div>
  );
};

export default OfferingDescriptionSettings;
