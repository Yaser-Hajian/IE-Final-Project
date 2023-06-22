import { CheckAuthentication } from "./components/checkAuthentication";
import adminRoutes from "./pages/dashboard/IT/routes";
import managerRoutes from "./pages/dashboard/manager/routes";
import professorRoutes from "./pages/dashboard/professorDashboard/routes/index.jsx";
import studentRoutes from "./pages/dashboard/studentDashboard/routes";

const baseRoutes = [
  { path: "/", element: <CheckAuthentication /> },
  { path: "*", element: <h1>NOT FOUND 404</h1> },
];

const routes = [
  ...baseRoutes,
  ...managerRoutes,
  ...studentRoutes,
  ...professorRoutes,
  ...adminRoutes,
];

export default routes;
