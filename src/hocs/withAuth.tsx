/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import CustomLoader from "@/components/loader/loader";
import useAuth from "@/features/auth";
import { REDIRECT_QUERY } from "@/lib/constants";
import { ROUTER_CONSTANTS } from "@/lib/router";
import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";

const withAuth = (
  WrappedComponent: NextComponentType<NextPageContext, any, any>
) => {
  return (props: any) => {
    const [key, setKey] = useState(Math.random().toString());
    const [isLoading, setIsLoading] = useState(true); // add loading state

    const disableLoader = () => {
      setTimeout(() => setIsLoading(false), 1000);
    };

    const router = useRouter();
    const { isAuthenticated, isAuthLoading } = useAuth();

    const { redirectUrl } = router.query;

    const currentPath = router.asPath;
    const pathName = router.pathname;

    useEffect(() => {
      setKey(Math.random().toString());
    }, [isAuthenticated]);

    useEffect(() => {
      if (!isAuthLoading) {
        disableLoader(); // set loading state to false
      }
    }, [isAuthLoading]);

    useEffect(() => {
      if (isLoading) return;

      if (!isAuthenticated) {
        if (pathName !== ROUTER_CONSTANTS.LOGIN) {
          router.replace({
            pathname: ROUTER_CONSTANTS.LOGIN,
            query: {
              [REDIRECT_QUERY]: encodeURIComponent(currentPath),
            },
          });
        }
        return;
      }
      if (isAuthenticated) {
        if (redirectUrl) {
          router.replace(decodeURIComponent(redirectUrl as string));
        }
      }
    }, [isAuthenticated, redirectUrl, key, isLoading]);

    if (isLoading) {
      // return a loader component while the user's authentication status is being determined
      return <CustomLoader />;
    }

    return <WrappedComponent key={key} {...props} />;
  };
};

export default withAuth;
