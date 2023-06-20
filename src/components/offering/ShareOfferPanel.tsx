import cn from 'classnames';
import React, { FC, useState } from 'react';
import router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { Maybe } from 'yup';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Offering, Organization } from 'types';

type ShareOfferPanelItemProps = { children: React.ReactNode; title: string; note?: string };

const ShareOfferPanelItem: FC<ShareOfferPanelItemProps> = ({ children, title, note }) => {
  const [showNote, setShowNote] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-between ">
      <div className="flex">
        <div className="text-2xl font-bold">{title}</div>
        {note && (
          <div
            className="relative ml-1 text-xs text-gray-500 hover:cursor-pointer"
            onClick={() => setShowNote(!showNote)}
          >
            <FontAwesomeIcon icon="info-circle" />
            {showNote && (
              <div
                className="absolute -left-12 z-40 bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-700 w-48 "
                onClick={() => setShowNote(false)}
              >
                {note}
              </div>
            )}
          </div>
        )}
      </div>{' '}
      <div className="col-span-1">{children}</div>
    </div>
  );
};

type ShareOfferPanelProps = {
  offering: Offering;
  currentSalePrice: Maybe<number> | undefined;
  organization: Organization | undefined;
  currentUser?: string;
};

const ShareOfferPanel: FC<ShareOfferPanelProps> = ({ offering, currentSalePrice, organization, currentUser }) => {
  const participants = offering.participants;
  const permittedEntity = participants?.find((participant) => {
    return participant?.addressOfferingId === currentUser + offering.id;
  });

  const sharesPledged = participants
    ? participants.reduce((acc, participant) => {
        const maxPledge = participant?.maxPledge ?? 0;
        return acc + maxPledge;
      }, 0)
    : 0;

  const percentPledged = offering.details?.numUnits ? (sharesPledged / offering.details.numUnits) * 100 : 0;

  const { details } = offering;

  const {
    investmentCurrency,
    projectedIrr,
    projectedIrrMax,
    preferredReturn,
    cocReturn,
    minUnitsPerInvestor,
    customOnboardingLink,
  } = details || {
    investmentCurrency: undefined,
    projectedIrr: undefined,
    projectedIrrMax: undefined,
    preferredReturn: undefined,
    cocReturn: undefined,
    minUnitsPerInvestor: undefined,
  };

  const buttonText = !permittedEntity ? 'Manage Investment' : 'Apply to Invest';
  const buttonLink =
    !permittedEntity && organization
      ? `/${organization.id}/portal/${offering.id}`
      : customOnboardingLink ?? `/${organization?.id}/portal/${offering.id}/investor-application`;

  const ApplyManageButton = (
    <button
      data-test="share-offer-panel"
      onClick={() => router.push(buttonLink)}
      className={cn([
        'ubuntu rounded-md font-bold bg-green-700 text-slate-100 px-4 py-2 items-center justify-center shadow-lg mt-4 flex w-full ',
      ])}
    >
      {buttonText}
    </button>
  );

  return (
    <div className="p-6 pb-4 text-gray-200 lg:text-gray-800 bg-slate-700 lg:bg-white shadow-xl rounded-xl ">
      <div className="flex items-center justify-between lg:text-cDarkBlue">
        <div className="text-3xl font-bold mt-3 mb-1">
          Price<span className="text-sm">/share</span>
        </div>
        <div className="flex items-center">
          <img src={getCurrencyOption(investmentCurrency)?.logo} className="h-6 mr-1" />
          <div className="text-4xl font-bold"> {`${numberWithCommas(currentSalePrice)} `}</div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <div className="w-full h-2 bg-gray-200 rounded">
          <div style={{ background: '#275A8F', width: `${percentPledged}%` }} className={'h-2 rounded'} />
        </div>
        <div className="text-xs text-gray-500 whitespace-nowrap">{`${percentPledged}% funded`}</div>
      </div>
      {/* <hr className="mt-5 mb-2 col-span-3" /> */}
      <div className="my-2 flex flex-col gap-4">
        {projectedIrr ? (
          <div className="my-6">
            <ShareOfferPanelItem title="Projected IRR" note="This is an estimate. Returns are not guaranteed.">
              {`${projectedIrr / 100}`}
              {projectedIrrMax ? ` - ${projectedIrrMax / 100}` : ''}%
            </ShareOfferPanelItem>
          </div>
        ) : (
          <></>
        )}
        {preferredReturn ? (
          <ShareOfferPanelItem title="Preferred Return" note="Cumulative, Non-Compounding">
            <div className="col-span-1">{preferredReturn / 100}% </div>
          </ShareOfferPanelItem>
        ) : (
          <></>
        )}
        {cocReturn ? (
          <ShareOfferPanelItem title="CoC Return" note="This is an estimate. Returns are not guaranteed.">
            <div className="col-span-1">{cocReturn ? `${cocReturn / 100}` : ''}% </div>
          </ShareOfferPanelItem>
        ) : (
          <></>
        )}
      </div>
      <div>{ApplyManageButton}</div>
      {minUnitsPerInvestor ? (
        <div className="mt-2 font-semibold text-xs  text-gray-300 lg:text-gray-700 text-center">{`* Minimum purchase: ${minUnitsPerInvestor} share${
          minUnitsPerInvestor !== 1 ? 's' : ''
        }  (${numberWithCommas(currentSalePrice ? currentSalePrice * minUnitsPerInvestor : undefined)} ${
          getCurrencyOption(investmentCurrency)?.symbol
        })`}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShareOfferPanel;
