import useAuth from "@/hooks/auth";
import { setBearerToken } from "@/services/http-request.service";
import React, { useEffect } from "react";

export type Props = {
  children?: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const { token, logoutSuccess, callGetAuthUser } = useAuth();
  const handleGetAuthUser = async () => {
    const user = await callGetAuthUser();
    if (!user) {
      logoutSuccess();
    }
  };

  useEffect(() => {
    if (token) {
      setBearerToken(token);
      handleGetAuthUser();
    } else {
      setBearerToken("");
    }
  }, [token]);
  return children;
};

export default AuthProvider;
