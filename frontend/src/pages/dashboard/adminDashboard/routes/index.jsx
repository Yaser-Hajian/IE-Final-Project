import AdminDashboard from "..";
import { CheckAuthentication } from "../../../../components/checkAuthentication";
import AdminAddCollege from "../addCollege";
import AdminManager from "../managers";
import AdminProfessor from "../professors";
import AdminStudent from "../students";

const adminRoutes = [
  {
    path: "/dashboard/admin",
    element: (
      <CheckAuthentication>
        <AdminDashboard />
      </CheckAuthentication>
    ),
    children: [
      { path: "students", element: <AdminStudent /> },
      { path: "professors", element: <AdminProfessor /> },
      { path: "managers", element: <AdminManager /> },
      { path: "college/add", element: <AdminAddCollege /> },
    ],
  },
];

export default adminRoutes;
