import * as backendCtc from '../../../web3/index.main';
import cn from 'classnames';
import FormattedCryptoAddress from '../../FormattedCryptoAddress';
import Input from '@src/components/form-components/Inputs';
import React, { FC, useContext, useState } from 'react';
import StandardButton from '@src/components/buttons/StandardButton';
import { ChainErrorResponses, StandardChainErrorHandling } from '@src/web3/helpersChain';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { OfferingParticipant } from 'types';
import { ReachContext } from '@src/SetReachContext';
import { UPDATE_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

type WhitelistAddressListItemProps = {
  participant: OfferingParticipant;
  contractId: string;
  removeAddress: (walletAddress: string, whitelistItemID: string) => void;
};

const WhitelistAddressListItem: FC<WhitelistAddressListItemProps> = ({ participant, contractId, removeAddress }) => {
  const { reachLib, userWalletAddress } = useContext(ReachContext);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [editOn, setEditOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateWhitelistObject, { data: dataUpdate }] = useMutation(UPDATE_OFFERING_PARTICIPANT);

  const [, updateWhitelist] = useAsyncFn(
    async (name: string, externalId: string, permitted: boolean) => {
      setButtonStep('submitting');
      if (permitted) {
        try {
          await updateWhitelistObject({
            variables: {
              currentDate: currentDate,
              id: participant.id,
              name: name,
              externalId: externalId,
              permitted: true,
            },
          });
          setButtonStep('confirmed');
          setEditOn(!editOn);
        } catch (e) {
          StandardChainErrorHandling(e, setButtonStep);
        }
      } else {
        const normalizeRecipientAddress = reachLib.formatAddress(participant.walletAddress); // make sure address, not PubKey
        const acc = await reachLib.getDefaultAccount();
        const ctc = acc.contract(backendCtc, contractId);
        const call = async (f) => {
          try {
            await f();
            await updateWhitelistObject({
              variables: {
                currentDate: currentDate,
                id: participant.id,
                name: name,
                externalId: externalId,
                permitted: true,
              },
            });
            setButtonStep('confirmed');
          } catch (e) {
            StandardChainErrorHandling(e, setButtonStep);
          }
        };

        const apis = ctc.a;
        call(async () => {
          const apiReturn = await apis.addWL(normalizeRecipientAddress);
          return apiReturn;
        });
      }
      setLoading(false);
    },
    [reachLib, updateWhitelistObject, participant.id, participant.walletAddress]
  );
  const isYou = participant.walletAddress === userWalletAddress;
  const EditWhitelistOff = (
    <div className="md:grid grid-cols-11 gap-3  ">
      <div className="col-span-6">
        <div className="text-sm">Wallet:</div>
        <FormattedCryptoAddress
          chainId={1}
          address={participant.walletAddress}
          withCopy
          className="font-bold text-base "
          userName={participant.name}
          isYou={isYou}
        />
        {/* <PresentWalletUser className="md:w-auto mt-2 font-medium" walletAddress={participant.address} /> */}
      </div>

      <div className="col-span-2 mt-3 md:mt-0">
        <div className="text-sm">External ID:</div>
        <div className="md:w-auto  font-medium ">{participant.externalId}</div>
      </div>
      <div className="col-span-3 mt-3 md:mt-0 flex justify-end">
        {participant.permitted ? (
          <div className="font-bold text-emerald-700 uppercase center self-center mr-4">approved</div>
        ) : (
          <StandardButton text="Review Candidate" color="cLightBlue" onClick={() => setEditOn(!editOn)} />
        )}
      </div>
    </div>
  );

  const EditWhitelistForm = (
    <Formik
      initialValues={{
        name: participant.name,
        externalId: participant.externalId,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name) {
          errors.type = 'Please enter a name';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        updateWhitelist(values.name, values.externalId, participant.permitted);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="md:grid grid-cols-9 gap-3">
            <div className={`bg-opacity-0 col-span-3`}>
              <div className="text-sm">Wallet:</div>
              <FormattedCryptoAddress
                chainId={1}
                address={participant.walletAddress}
                withCopy
                className="font-bold text-base "
                userName={participant.name}
              />
              {/* <PresentWalletUser className="md:w-auto mt-2 font-medium" walletAddress={participant.address} /> */}
            </div>

            <Input
              className={`bg-opacity-0 col-span-3`}
              labelText="Name"
              name="name"
              type="text"
              placeholder="Lisa Novak"
              required
            />
            <Input
              className={`bg-opacity-0 col-span-3`}
              labelText="external ID"
              name="externalId"
              type="text"
              placeholder="934834 (optional)"
            />
          </div>
          <button
            className={cn(
              [participant.permitted ? 'bg-cLightBlue hover:bg-cDarkBlue' : 'bg-emerald-600 hover:bg-emerald-800'],
              'font-bold  text-white  uppercase mt-4 rounded p-2 w-full'
            )}
            type="submit"
            disabled={isSubmitting}
          >
            <LoadingButtonText
              state={buttonStep}
              idleText={`${participant.permitted ? `Update Investor` : `Approve & Update Investor`}`}
              submittingText="Updating..."
              confirmedText="Investor Updated!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
            {/* {loading ? (
              <img
                src="/assets/images/loading-circle.jpeg"
                aria-label="loading"
                className="h-6 mr-1 animate-spin bg-white rounded-full"
              />
            ) : participant.permitted ? (
              `Update Investor`
            ) : (
              `Approve & Update Investor`
            )} */}
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="relative md:grid grid-cols-11 items-center ">
      <div className={cn(isYou && 'bg-gray-50', 'col-span-10 p-3  border-2 rounded-lg ')}>
        {!editOn ? (
          <>{EditWhitelistOff}</>
        ) : (
          <div>
            {EditWhitelistForm}

            {participant.permitted && (
              <button
                className="bg-red-900 hover:bg-red-800 text-white font-bold uppercase mt-2 rounded p-2 w-full"
                aria-label="remove wallet from whitelist"
                onClick={() => removeAddress(participant.walletAddress, participant.id)}
              >
                Remove this this investor from the whitelist
              </button>
            )}
            <button
              className="bg-cLightBlue hover:bg-cDarkBlue text-white font-bold uppercase mt-2 rounded p-2 w-full"
              aria-label="review application"
              onClick={() =>
                DownloadFile(
                  participant.investorApplication.applicationDoc.text,
                  `${participant.name} - application.md`
                )
              }
            >
              Review Investor Application
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button aria-label="edit address info" onClick={() => setEditOn(!editOn)}>
          {editOn ? (
            <FontAwesomeIcon icon="times" className="text-xl text-gray-600 mr-2" />
          ) : (
            <FontAwesomeIcon icon="pen" className="text-xl text-gray-600 mr-2" />
          )}
        </button>
      </div>
    </div>
  );
};

export default WhitelistAddressListItem;
