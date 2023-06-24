import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import DashboardHeader from "../../../components/dashboard/header/header";
import Footer from "../../../components/dashboard/footer/footer";

const AdminDashboard = () => {
  return (
    <div className={styles.con}>
      <DashboardHeader userType={"admin"} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminDashboard;
