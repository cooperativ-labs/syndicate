import * as backendCtc from '../../web3/ABI';
import FormButton from '../buttons/FormButton';
import React, { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '../buttons/Button';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';

type TempWhiteListOptInProps = {
  shareContractId: string;
};

const TempWhiteListOptIn: FC<TempWhiteListOptInProps> = ({ shareContractId }) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const optIn = async () => {
    const reach = await loadStdlib({ REACH_CONNECTOR_MODE: 'ALGO' });
    reach.setWalletFallback(reach.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
    const acc = await reach.getDefaultAccount();
    const ctc = acc.contract(backendCtc, shareContractId);
    const call = async (f) => {
      try {
        await f();
        setButtonStep('confirmed');
      } catch (e) {
        setButtonStep('failed');
      }
    };
    const apis = ctc.a;
    call(async () => {
      const apiReturn = await apis.optIn();
      //console.log(`wait for it... share tokens allocated...`, apiReturn);
      return apiReturn;
    });
  };

  return (
    <Formik
      initialValues={{}}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await optIn();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <FormButton type="submit" disabled={isSubmitting || buttonStep === 'submitting'}>
            <LoadingButtonText
              state={buttonStep}
              idleText={`Add me too ${shareContractId}`}
              submittingText="Deploying - This can take time. Please do not refresh."
              confirmedText="You have requested to join the whitelist!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default TempWhiteListOptIn;
