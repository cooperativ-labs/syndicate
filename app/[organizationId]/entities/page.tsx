import ManagerWrapper from "@src/containers/ManagerWrapper";
import EntityDashboard from "@src/screens/EntityDashboard";
import React from "react";

const EntitiesPage = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <EntityDashboard />
      </ManagerWrapper>
    </div>
  );
};

export default EntitiesPage;
