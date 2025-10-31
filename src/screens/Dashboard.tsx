"use client";
import { useUserContext } from "@contexts/UserContext";
import { Organization } from "@gql/graphql";
import Card from "@src/components/cards/Card";
import CreateOffering from "@src/components/offering/CreateOffering";
import CreateOrganization from "@src/components/organization/CreateOrganization";
import EnsureOrganization from "@src/containers/EnsureOrganization";
import { getOrgsFromUser, handleOrganizationChange } from "@src/utils/helpersOrganization";
import React, { FC, useEffect, useState } from "react";
const Dashboard: FC = () => {
  const { user } = useUserContext();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    let isMounted = true;

    // const loadOrganizations = async () => {
    //   if (!user) {
    //     if (isMounted) {
    //       setOrganizations([]);
    //     }
    //     return;
    //   }

    //   const orgs = await getOrgsFromUser(user);
    //   if (isMounted) {
    //     setOrganizations(orgs as Organization[]);
    //   }
    // };

    // loadOrganizations();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const hasOrganizations = organizations.length > 0;

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      {/* <button onClick={handleClick}>Log User</button> */}
      {/* <div className="mx-auto"> */}

      {!hasOrganizations ? (
        <div className="flex flex-col w-full h-full items-center">
          <h1 className="text-2xl mb-4 text-center">
            {`Welcome to Cooperativ's portal for creating and managing investment funds.`}
          </h1>
          <h2 className="text-2xl font-medium mb-8 text-center">
            Start by creating an organization.
          </h2>
          <Card className="rounded-lg shadow-box p-4 " style={{ width: 700 }}>
            <h2 className="text-xl text-cDarkBlue mb-8 ">
              {`You manage your brand and team members at the organization level. Each organization can manage multiple
        funds.`}
            </h2>

            <CreateOrganization />
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 p-6 border-2 rounded-md">
            <h2 className="text-xl  text-blue-900 font-semibold">Create an offering:</h2>
            <EnsureOrganization
              user={user}
              explainerText="In order to create an offering, we first need some personal information"
            >
              <CreateOffering organization={organizations[0]} refetch={() => {}} />
            </EnsureOrganization>
          </div>
          <div className="col-span-1">
            <div>
              <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">
                Your Organizations{" "}
              </h2>
              {organizations.map(organization => {
                return (
                  <div
                    key={organization.id}
                    className="p-4 flex bg-slate-300 rounded-md my-2 items-center cursor-pointer"
                    onClick={() => {
                      handleOrganizationChange(organization.id);
                    }}
                  >
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={organization.logo as string}
                      alt="Avatar of Organization"
                    />
                    <h3 className="text-lg text-blue-900 font-semibold">{organization.name}</h3>
                  </div>
                );
              })}
            </div>
            {/* {isParticipant ? (
              <div>
                <h2 className="text-xl md:mt-8 mb-5  text-blue-900 font-semibold">Your Investments: </h2>
                <OfferingsList offerings={participantOfferings} />
              </div>
            ) : (
              <div className="flex mt-4">
                {!userWalletAddress && <ChooseConnectorButton buttonText={'Connect wallet to see investments'} large />}
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
