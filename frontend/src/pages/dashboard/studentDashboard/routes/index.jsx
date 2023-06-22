import StudentDashboard from "..";
import { CheckAuthentication } from "../../../../components/checkAuthentication";
import Home from "../../../../components/dashboard/home";
import Terms from "../../../../components/dashboard/terms/terms";
import TermId from "../../../../components/dashboard/terms[Id]";
import PreregistrationCourses from "../preregistration_courses";
import Preregistrations from "../preregistrations";
import RegistrationCourses from "../registration_courses";
import Registrations from "../registrations";

const studentRoutes = [
  {
    path: "/dashboard/student",
    element: (
      <CheckAuthentication>
        <StudentDashboard />
      </CheckAuthentication>
    ),
    children: [
      { path: "", element: <Home userType={"student"} /> },
      { path: "terms", element: <Terms userType={"student"} /> },
      { path: "terms/:termId", element: <TermId userType={"student"} /> },
      {
        path: "terms/:termId/preregistration_courses",
        element: <PreregistrationCourses />,
      },
      {
        path: "terms/:termId/preregistrations",
        element: <Preregistrations />,
      },
      { path: "terms/:termId/registrations", element: <Registrations /> },
      {
        path: "terms/:termId/registration_courses",
        element: <RegistrationCourses />,
      },
    ],
  },
];

export default studentRoutes;
