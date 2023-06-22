import ProfessorDashboard from "..";
import { CheckAuthentication } from "../../../../components/checkAuthentication";
import Home from "../../../../components/dashboard/home";
import Terms from "../../../../components/dashboard/terms/terms";
import ProfessorDashboardCourseId from "../course[id]";
import ProfessorDashboardTermId from "../terms[Id]";

const professorRoutes = [
  {
    path: "/dashboard/professor",
    element: (
      <CheckAuthentication>
        <ProfessorDashboard />
      </CheckAuthentication>
    ),
    children: [
      { path: "", element: <Home userType={"professor"} /> },
      { path: "terms", element: <Terms userType={"professor"} /> },
      {
        path: "terms/:termId",
        element: <ProfessorDashboardTermId userType={"professor"} />,
      },
      {
        path: "course/:courseId/registrations",
        element: <ProfessorDashboardCourseId />,
      },
    ],
  },
];

export default professorRoutes;
