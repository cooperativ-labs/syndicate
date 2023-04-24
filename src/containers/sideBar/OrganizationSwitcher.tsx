import cn from 'classnames';
import CooperativLogo from '@src/components/CooperativLogo';
import React, { FC, useContext } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleOrganizationChange } from '@src/utils/helpersOrganization';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Organization } from 'types';

type OrganizationSwitcherProps = {
  organizations: Organization[];

  // onOrganizationChange: (id: string) => void;
};

const backgroundColor = ' bg-gray-200';

const OrganizationSwitcher: FC<OrganizationSwitcherProps> = ({ organizations }) => {
  const OrganizationIdFromSessionStorage = window.sessionStorage?.getItem('CHOSEN_ORGANIZATION');
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: toggleCreateOrganization } = applicationStore;

  return (
    <div className={cn('relative min-h-full', backgroundColor)}>
      <div className="z-10 flex flex-col min-w-max pt-2 rounded-md focus:outline-none">
        {organizations.map((org) => (
          <button
            key={org.id}
            type="button"
            className={cn(
              'flex items-center overflow-hidden m-2 rounded-lg hover:border-white  border-4 focus:outline-none',

              OrganizationIdFromSessionStorage === org.id ? 'border-4 border-slate-600' : ''
            )}
            onClick={() => handleOrganizationChange(org.id)}
          >
            <img className="w-14 h-14" src={org.logo ?? '/assets/images/logos/company-placeholder.jpeg'} alt="" />

            {/* {org.name} */}
          </button>
        ))}
        <button
          className="flex  mx-2 rounded-lg border-4 text-gray-800 hover:text-gray-800 text-xl  focus:outline-none"
          onClick={() => toggleCreateOrganization({ type: 'TOGGLE_CREATE_ORG_MODAL' })}
        >
          <div className=" flex items-center justify-center w-14 h-14">
            <FontAwesomeIcon icon={'fa-plus' as IconProp} />
          </div>
        </button>
        <div className="absolute bottom-3 left-3 justify-center">
          <CooperativLogo onlySymbol />
        </div>
      </div>
    </div>
  );
};

export default OrganizationSwitcher;
