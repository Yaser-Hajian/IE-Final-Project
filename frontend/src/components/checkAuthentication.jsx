/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const CheckAuthentication = ({ children }) => {
  const pathname = useLocation().pathname;
  const isLogin = /^\/login/.test(pathname);
  const isAuthenticated = useAuth();
  if (isAuthenticated) {
    return isLogin || pathname == "/" ? (
      <Navigate to={"/dashboard"} replace />
    ) : (
      children
    );
  }
  return !isLogin ? <Navigate to={"/login"} replace /> : children;
};

export { CheckAuthentication };
