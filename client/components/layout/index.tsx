"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Avatar, Popover } from "antd";
import { useEffect, useState } from "react";
import { LogOut, User } from "react-feather";
import { getLoginResponseObject } from "../utils/helper";
import { isEmpty } from "lodash";
import { UN_AUTH_PAGES } from "../utils/constants";
import { usePathname } from "next/navigation";

const LayoutClientComponent = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<any>(null);
  const path = usePathname();

  useEffect(() => {
    const userData = getLoginResponseObject();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  const checkPathName = (pathName: string) => {
    return !Object?.values(UN_AUTH_PAGES)?.includes(pathName);
  };

  return (
    <html lang="en">
      <head>
        <title>Take Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={"/favicon.ico"} />
      </head>
      <body className="bg-gray-200 ">
        {checkPathName(path) ? (
          <div className="flex justify-between items-center bg-white p-2 px-4 shadow-sm">
            <div className="font-bold text-xl text-green-700">Take Home</div>
            <div>
              <Popover
                trigger={"click"}
                content={
                  <div>
                    <div className="flex items-center space-x-2">
                      <Avatar icon={<User />} size={"large"} />
                      <div className="font-semibold text-base flex flex-col">
                        <span>{user?.name}</span>
                        <span className="text-xs">{user?.email}</span>
                      </div>
                    </div>
                    <div
                      onClick={() => handleLogout()}
                      className="mt-4 flex items-center gap-2 hover:bg-red-500 hover:text-white p-2 rounded-md transition-all ease-in-out cursor-pointer"
                    >
                      <LogOut size={14} />
                      Logout
                    </div>
                  </div>
                }
              >
                <Avatar icon={<User />} />
              </Popover>
            </div>
          </div>
        ) : null}
        <QueryClientProvider client={queryClient}>
          <div className="px-4">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default LayoutClientComponent;
