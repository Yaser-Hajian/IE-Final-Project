import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import DashboardHeader from "../../../components/dashboard/header/header";
import Footer from "../../../components/dashboard/footer/footer";

const ProfessorDashboard = () => {
  return (
    <div className={styles.con}>
      <DashboardHeader userType={"professor"} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ProfessorDashboard;
