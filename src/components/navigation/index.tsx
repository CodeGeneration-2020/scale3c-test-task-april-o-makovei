import useAuth from "@/features/auth";
import React from "react";

const Navigation = () => {
  const { profile, isAuthenticated, signOut } = useAuth();

  const ROUTES = [
    {
      label: "Sing Out",
      isHidden: isAuthenticated,
      onClick: signOut,
    },
  ].filter((_) => _.isHidden);

  return (
    <div className="flex justify-between items-center py-[15px] px-[10px] bg-medium-blue text-white">
      <div className="flex">
        {isAuthenticated && `Welcome back ${profile?.email?.split("@")[0]}!`}
        {!isAuthenticated &&
          "Welcome to the app! Please sign in in order to continue."}
      </div>
      <ul className="flex no-underline list-none gap-[15px]">
        {ROUTES.map((_, idx) => (
          <li
            onClick={_.onClick}
            key={idx}
            className="center cursor-pointer transition-all delay-600 ease-in-out hover:text-black hover:translate-y-px"
          >
            {_.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
