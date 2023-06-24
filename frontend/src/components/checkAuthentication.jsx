/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useLoggedUserInfo from "../hooks/useLoggedUserData";
import Loader from "./dashboard/loader/loader";
import { useSelector } from "react-redux";

const CheckAuthentication = ({ children }) => {
  const pathname = useLocation().pathname;
  const { isLoading } = useLoggedUserInfo();
  const isLogin = /^\/login/.test(pathname);
  const isAuthenticated = useAuth();
  const { userType } = useSelector((s) => s.loggedUser);
  if (isLoading) {
    return <Loader />;
  }

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
