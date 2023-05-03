import Button from '@src/components/buttons/Button';
import FormModal from '@src/containers/FormModal';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import React, { FC } from 'react';
import Select from '@src/components/form-components/Select';

import { CREATE_UNESTABLISHED_SMART_CONTRACT } from '@src/utils/dGraphQueries/crypto';
import { CurrencyCode, Offering, SmartContractType } from 'types';
import { Form, Formik } from 'formik';
import { MatchSupportedChains, setChainId } from '@src/web3/connectors';
import { UPDATE_CONTRACT_STATUS } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';

type UpdateContractStatusProps = {
  offering: Offering;
};

const TestBackingTokenId = '0x05716d2b';

const UpdateContractStatus: FC<UpdateContractStatusProps> = ({ offering }) => {
  const [updateStatus, { data, error }] = useMutation(UPDATE_CONTRACT_STATUS);
  const [addUnestablishedSmartContract] = useMutation(CREATE_UNESTABLISHED_SMART_CONTRACT);
  const chainId = setChainId;
  const protocol = MatchSupportedChains(chainId)?.protocol;

  return (
    <>
      <Formik
        initialValues={{
          smartContractId: '',
        }}
        validate={(values) => {}}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          updateStatus({
            variables: {
              offeringId: offering.id,
              smartContractId: values.smartContractId,
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
              name="smartContractId"
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
          contractId: '',
          contractCreatorId: '',
        }}
        validate={(values) => {}}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          addUnestablishedSmartContract({
            variables: {
              cryptoAddress: values.contractId,
              chainId: chainId,
              backingToken: CurrencyCode.AlgoUsdcTest,
              type: SmartContractType.ExchangeManager,
              protocol: protocol,
              owner: values.contractCreatorId,
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col gap relative">
            <Input name="contractId" labelText="contract id" />
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
