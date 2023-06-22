import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import DashboardHeader from "../../../components/dashboard/header/header";
import Footer from "../../../components/dashboard/footer/footer";
import useLoggedUserInfo from "../../../hooks/useLoggedUserData";
import Loader from "../../../components/dashboard/loader/loader";

const ProfessorDashboard = () => {
  const { isLoading, isError } = useLoggedUserInfo();
  return (
    <>
      {isError ? (
        <h1>error</h1>
      ) : isLoading ? (
        <Loader loadingText="داشبورد در حال لود شدن" />
      ) : (
        <div className={styles.con}>
          <DashboardHeader userType={"professor"} />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProfessorDashboard;
