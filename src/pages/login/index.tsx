import React from "react";
import Login from "@/components/login";
import NextContainer from "@/components/wrapper";
import Navigation from "@/components/navigation";

const PageLogin = () => {
  return (
    <div>
      <Navigation />
      <NextContainer>
        <Login />
      </NextContainer>
    </div>
  );
};

export default PageLogin;
