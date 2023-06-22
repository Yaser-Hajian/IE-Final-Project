/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUserType } from "../hooks/useUserType";

const CheckAuthentication = ({ children }) => {
  const pathname = useLocation().pathname;
  const isLogin = /^\/login/.test(pathname);
  const isAuthenticated = useAuth();
  const userType = useUserType();
  // const checkAccess = new RegExp(`/dashboard/${userType}`);
  // if (!checkAccess.test(pathname) && !isLogin) {
  //   return <Navigate to={`/dashboard/${userType}`} replace />;
  // }
  if (isAuthenticated) {
    return isLogin || pathname == "/" ? (
      <Navigate to={`/dashboard/${userType}`} replace />
    ) : (
      children
    );
  }
  return !isLogin ? <Navigate to={"/login"} replace /> : children;
};

export { CheckAuthentication };
