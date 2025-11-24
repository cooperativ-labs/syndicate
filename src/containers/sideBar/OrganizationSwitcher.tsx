import { useOrganizations } from '@contexts/OrganizationsContext';
import CooperativLogo from '@src/components/PlatformLogo';
import { cn } from '@src/lib/utils';
import { organizationChangeServer } from '@src/utils/helpersServer';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';

import { Organization } from '@/types';

type OrganizationSwitcherProps = {
  organizations: Organization[];

  // onOrganizationChange: (id: string) => void;
};

const backgroundColor = ' bg-gray-200';

const OrganizationSwitcher: FC<OrganizationSwitcherProps> = ({ organizations }) => {
  const { chosenOrganizationId, setCreateOrganizationModalOpen } = useOrganizations();

  const handleOrganizationChange = (id: string) => {
    organizationChangeServer(id);
  };
  return (
    <div className={cn('relative min-h-full', backgroundColor)}>
      <div className='z-10 flex flex-col min-w-max pt-2 rounded-md focus:outline-none'>
        {organizations.map(org => (
          <button
            key={org.id}
            type='button'
            className={cn(
              'flex items-center overflow-hidden m-2 rounded-lg hover:border-white  border-4 focus:outline-none',

              chosenOrganizationId === org.id.toString() ? 'border-4 border-slate-600' : ''
            )}
            onClick={() => handleOrganizationChange(org.id.toString())}
          >
            <Image
              className='w-14 h-14 object-cover'
              src={org.logo || '/assets/images/logos/company-placeholder.jpeg'}
              alt={org.name ?? 'Organization logo'}
              width={56}
              height={56}
              unoptimized={org.logo?.startsWith('http') ?? false}
            />
            {/* <img
              src={org.logo ?? '/assets/images/logos/company-placeholder.jpeg'}
              alt={org.name ?? 'Organization logo'}
              className="w-14 h-14"
            /> */}

            {/* {org.name} */}
          </button>
        ))}
        <button
          className='flex  mx-2 rounded-lg border-4 text-gray-800 hover:text-gray-800 text-xl  focus:outline-none'
          onClick={() => setCreateOrganizationModalOpen(true)}
        >
          <div className=' flex items-center justify-center w-14 h-14'>
            <Plus />
          </div>
        </button>
        <div className='absolute bottom-3 left-3 justify-center'>
          <CooperativLogo onlySymbol />
        </div>
      </div>
    </div>
  );
};

export default OrganizationSwitcher;
