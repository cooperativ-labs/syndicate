import AddressDisplay from '../address/AddressDisplay';
import GpAdder from '../entity/GpAdder';
import React, { FC } from 'react';
import SectionBlock from '@src/containers/SectionBlock';
import { LegalEntity } from 'types';

type EntityAddressPanelProps = {
  offeringEntity: LegalEntity;
  owners: LegalEntity[];
};

const EntityAddressPanel: FC<EntityAddressPanelProps> = ({ offeringEntity, owners }) => {
  return (
    <SectionBlock sectionTitle={offeringEntity.fullName} mini>
      <div className="bg-gray-200 p-3 rounded-md">
        {offeringEntity.addresses.map((address, i) => (
          <div key={i}>
            <AddressDisplay address={address} className="text-sm" />
            {offeringEntity.addresses.length > 0 && <hr className="my-1" />}
          </div>
        ))}
        {owners.length > 0 && (
          <>
            <hr className="border-t-2 my-3 border-gray-300" />
            {owners.map((entity, i) => {
              return (
                <div key={i}>
                  <div>{entity.fullName}</div>
                  <div>
                    {entity.addresses.map((address, i) => (
                      <AddressDisplay address={address} key={i} />
                    ))}
                  </div>
                  <div>{entity.supplementaryLegalText}</div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </SectionBlock>
  );
};

export default EntityAddressPanel;
