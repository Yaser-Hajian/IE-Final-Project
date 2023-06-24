import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import DashboardHeader from "../../../components/dashboard/header/header";
import Footer from "../../../components/dashboard/footer/footer";

const ManagerDashboard = () => {
  return (
    <div className={styles.con}>
      <DashboardHeader userType={"manager"} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ManagerDashboard;
