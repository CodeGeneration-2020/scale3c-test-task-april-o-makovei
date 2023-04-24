import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ROUTER_CONSTANTS } from "@/lib/router";

const CustomError = ({ statusCode }: { statusCode: number }) => {
  const router = useRouter();

  useEffect(() => {
    if (statusCode === 404) {
      router.replace(ROUTER_CONSTANTS.DASHBOARD);
    }
  }, [statusCode, router]);

  return <div>Redirecting...</div>;
};

CustomError.getInitialProps = async ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
