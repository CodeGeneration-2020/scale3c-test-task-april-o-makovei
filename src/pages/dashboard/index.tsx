import React from "react";
import Dashboard from "@/components/dashboard";
import Navigation from "@/components/navigation";
import NextContainer from "@/components/wrapper";

const PageAccount = () => {
  return (
    <div>
      <Navigation />
      <NextContainer className="flex flex-col">
        <Dashboard />
      </NextContainer>
    </div>
  );
};

export default PageAccount;
