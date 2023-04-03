import React, { FC } from 'react';

import cn from 'classnames';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { UPDATE_SALE } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';

type SaleVisibilityToggleProps = {
  saleVisibility: boolean;
  saleId: string;
};
const SaleVisibilityToggle: FC<SaleVisibilityToggleProps> = ({ saleVisibility, saleId }) => {
  const [updateSaleObject, { data, error }] = useMutation(UPDATE_SALE);

  const handleToggle = () => {
    updateSaleObject({
      variables: {
        currentDate: currentDate,
        saleId: saleId,
        visible: !saleVisibility,
      },
    });
  };

  return (
    <div className="flex items-center">
      <div className="flex align-middle justify-between min-w-max">
        <span className="mr-2"> Visible to investors </span>
        <button
          className=" border-2 border-grey-50 rounded-full w-12 bg-white  mr-10"
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
          }}
        >
          <div className={cn([saleVisibility ? ' ml-5 bg-emerald-600' : 'bg-gray-400'], 'h-6 w-6 rounded-full ')} />
        </button>
      </div>
    </div>
  );
};

export default SaleVisibilityToggle;
