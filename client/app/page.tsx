"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES, UN_AUTH_PAGES } from "../components/utils/constants";
import PageLoader from "@/components/page-loader";
import { getLoginResponseObject } from "@/components/utils/helper";

const LandingScreen = () => {
  const Router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData=getLoginResponseObject();  
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  useEffect(() => {
    if (user?.token) {
      navigateToHomeScreen();
    } else {
      navigateToLoginScreen();
    }
  }, [user]);

  const navigateToHomeScreen = () => {
    const path = ROUTES.HOME;
    Router.replace(path);
  };

  const navigateToLoginScreen = () => Router.replace(UN_AUTH_PAGES.LOGIN);

  return <PageLoader />;
};

const provider = () => {
  return <LandingScreen />;
};

export default provider;
