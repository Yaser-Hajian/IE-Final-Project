import { CheckAuthentication } from "./components/checkAuthentication";
import adminRoutes from "./pages/dashboard/adminDashboard/routes";
import managerRoutes from "./pages/dashboard/managerDashboard/routes";
import professorRoutes from "./pages/dashboard/professorDashboard/routes/index.jsx";
import studentRoutes from "./pages/dashboard/studentDashboard/routes";
import loginRoutes from "./pages/login/routes";
import OpenApi from "./pages/openApi";

const baseRoutes = [
  { path: "/", element: <CheckAuthentication /> },
  { path: "/api", element: <OpenApi /> },
  { path: "*", element: <h1>NOT FOUND 404</h1> },
];

const routes = [
  ...baseRoutes,
  ...loginRoutes,
  ...managerRoutes,
  ...studentRoutes,
  ...professorRoutes,
  ...adminRoutes,
];

export default routes;
