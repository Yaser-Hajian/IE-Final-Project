import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import DashboardHeader from "../../../components/dashboard/header/header";
import Footer from "../../../components/dashboard/footer/footer";
import useLoggedUserInfo from "../../../hooks/useLoggedUserData";
import Loader from "../../../components/dashboard/header/loader";

const StudentDashboard = () => {
  const { isLoading, error } = useLoggedUserInfo();
  return (
    <>
      {error ? (
        <h1>error</h1>
      ) : isLoading ? (
        <Loader loadingText="داشبورد در حال لود شدن" />
      ) : (
        <div className={styles.con}>
          <DashboardHeader userType={"student"} />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
