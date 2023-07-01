/* eslint-disable react/prop-types */
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useMeData from "../hooks/useMeData";
import Loader from "./dashboard/loader/loader";
import { useSelector } from "react-redux";

const CheckAuthentication = ({ children }) => {
  const pathname = useLocation().pathname;
  const isLogin = /^\/login/.test(pathname);
  const isAuthenticated = useAuth();
  const { userType } = useSelector((s) => s.me);
  const { isLoading } = useMeData();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated && userType == null) {
    navigate(0);
  }
  if (isAuthenticated && userType != null) {
    const checkAccess = new RegExp(`/dashboard/${userType}`);
    if (!checkAccess.test(pathname) && !isLogin) {
      return <Navigate to={`/dashboard/${userType}`} replace />;
    }
    return isLogin || pathname == "/" ? (
      <Navigate to={`/dashboard/${userType}`} replace />
    ) : (
      children
    );
  }
  return !isLogin ? <Navigate to={"/login"} replace /> : children;
};

export { CheckAuthentication };
