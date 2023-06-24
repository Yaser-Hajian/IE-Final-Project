import AdminDashboard from "..";
import { CheckAuthentication } from "../../../../components/checkAuthentication";
import AdminAddCollege from "../addCollege";
import AddOrEditManager from "../addOrEditManager";
import AddOrEditProfessor from "../addOrEditProfessor";
import AddOrEditStudent from "../addOrEditStudent";
import AdminHomePage from "../home";
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
      { path: "", element: <AdminHomePage /> },
      {
        path: "students",
        element: <AdminStudent />,
      },
      { path: "student/add", element: <AddOrEditStudent type={"add"} /> },
      {
        path: "student/:studentId/edit",
        element: <AddOrEditStudent type={"edit"} />,
      },
      { path: "professor/add", element: <AddOrEditProfessor type={"add"} /> },
      {
        path: "professor/:professorId/edit",
        element: <AddOrEditProfessor type={"edit"} />,
      },

      { path: "manager/add", element: <AddOrEditManager type={"add"} /> },
      {
        path: "manager/:managerId/edit",
        element: <AddOrEditManager type={"edit"} />,
      },
      { path: "professors", element: <AdminProfessor /> },
      { path: "managers", element: <AdminManager /> },
      { path: "college/add", element: <AdminAddCollege /> },
    ],
  },
];

export default adminRoutes;
