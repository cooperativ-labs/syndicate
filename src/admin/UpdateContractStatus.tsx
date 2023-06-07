import Button from '@src/components/buttons/Button';
import FormModal from '@src/containers/FormModal';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import React, { FC } from 'react';
import Select from '@src/components/form-components/Select';

import { CREATE_SMART_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { CurrencyCode, Offering, SmartContractType } from 'types';
import { Form, Formik } from 'formik';
import { MatchSupportedChains } from '@src/web3/connectors';
import { UPDATE_CONTRACT_STATUS } from '@src/utils/dGraphQueries/offering';
import { useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';

type UpdateContractStatusProps = {
  offering: Offering;
};

const UpdateContractStatus: FC<UpdateContractStatusProps> = ({ offering }) => {
  const [updateStatus, { data, error }] = useMutation(UPDATE_CONTRACT_STATUS);
  const [addUnestablishedSmartContract] = useMutation(CREATE_SMART_CONTRACT);
  const chainId = useChainId();
  const protocol = MatchSupportedChains(chainId)?.protocol;

  return (
    <>
      <Formik
        initialValues={{
          smartshareContractId: '',
        }}
        validate={(values) => {}}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          updateStatus({
            variables: {
              offeringId: offering.id,
              smartshareContractId: values.smartshareContractId,
              established: true,
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap relative">
            <Select
              className={defaultFieldDiv}
              required
              name="smartshareContractId"
              labelText="Distributions will be paid in"
            >
              <option value="">Select contract</option>;
              {offering.smartContracts.map((option, i) => {
                return (
                  <option key={i} value={option.id}>
                    {option.cryptoAddress.address} - {`${option.established}`}
                  </option>
                );
              })}
            </Select>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-cLightBlue hover:bg-blue-800 text-white font-bold text-sm uppercase mt-4 rounded p-4 w-full "
            >
              {`Update`}
            </Button>
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={{
          shareContractId: '',
          contractCreatorId: '',
        }}
        validate={(values) => {}}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          addUnestablishedSmartContract({
            variables: {
              cryptoAddress: values.shareContractId,
              chainId: chainId,
              backingToken: CurrencyCode.AlgoUsdcTest,
              type: SmartContractType.Share,
              protocol: protocol,
              owner: values.contractCreatorId,
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap relative">
            <Input name="shareContractId" labelText="contract id" />
            <Input
              name="contractCreatorId"
              labelText="legal Entity ID
            "
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-cLightBlue hover:bg-blue-800 text-white font-bold text-sm uppercase mt-4 rounded p-4 w-full "
            >
              {`Update`}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateContractStatus;
