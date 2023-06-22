import ITDashboard from "..";
import { CheckAuthentication } from "../../../../components/checkAuthentication";
import Home from "../../../../components/dashboard/home";
import ITAddCollege from "../addCollege";
import ITManagers from "../managers";
import ITProfessors from "../professors";
import ITStudents from "../students";

const adminRoutes = [
  {
    path: "/dashboard/admin",
    element: (
      <CheckAuthentication>
        <ITDashboard />
      </CheckAuthentication>
    ),
    children: [
      { path: "", element: <Home userType={"admin"} /> },
      { path: "students", element: <ITStudents /> },
      { path: "professors", element: <ITProfessors /> },
      { path: "managers", element: <ITManagers /> },
      { path: "college/add", element: <ITAddCollege /> },
    ],
  },
];

export default adminRoutes;
