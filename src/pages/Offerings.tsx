import CreateOffering from '@src/components/offering/CreateOffering';
import EnsureProfileCompletion from '@src/containers/EnsureProfileCompletion';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import MajorActionButton from '@src/components/buttons/MajorActionButton';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC, useContext } from 'react';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserAccountContext } from '@src/SetAppContext';

const Offerings: FC = () => {
  const { uuid } = useContext(UserAccountContext);
  const { data: userData } = useQuery(GET_USER, { variables: { uuid: uuid } });
  const user = userData?.queryUser[0];

  const offerings = user.offerings.map((offeringUser) => {
    return offeringUser.offering;
  });
  const hasOfferings = offerings.length > 0;
  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <div className="flex">
        <section>
          {hasOfferings ? (
            <>
              <OfferingsList offerings={offerings} />
              <MajorActionButton className="w-full md:w-96" link="offerings/create-offering">
                Create another Offering
              </MajorActionButton>
            </>
          ) : (
            <LimitedWidthSection center>
              <EnsureProfileCompletion
                user={user}
                explainerText="In order to create an offering, we first need some personal information"
              >
                <CreateOffering />
              </EnsureProfileCompletion>
            </LimitedWidthSection>
          )}
        </section>
      </div>
    </div>
  );
};

export default Offerings;
