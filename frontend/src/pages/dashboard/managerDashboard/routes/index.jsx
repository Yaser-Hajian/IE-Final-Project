import ManagerDashboard from "..";
import { CheckAuthentication } from "../../../../components/checkAuthentication";
import Home from "../../../../components/dashboard/home";
import Terms from "../../../../components/dashboard/terms/terms";
import TermId from "../../../../components/dashboard/terms[Id]";
import AddCourse from "../addCourse";
import ManagerCoursePreregistrations from "../coursePreregistrations";
import ManagerCourseRegistrations from "../courseRegistrations";
import EditOrAddTerm from "../editOrAddTerm";
import ManagerPreregistrationCourses from "../preregistration_courses";
import ManagerProfessors from "../professors";
import ManagerRegistrationCourses from "../registration_courses";
import ManagerStudents from "../students";

const managerRoutes = [
  {
    path: "/dashboard/manager",
    element: (
      <CheckAuthentication>
        <ManagerDashboard />
      </CheckAuthentication>
    ),
    children: [
      { path: "", element: <Home userType={"manager"} /> },
      { path: "terms", element: <Terms userType={"manager"} /> },
      {
        path: "terms/edit/:termId",
        element: <EditOrAddTerm type={"edit"} />,
      },
      { path: "terms/:termId", element: <TermId userType={"manager"} /> },
      { path: "terms/add", element: <EditOrAddTerm type={"add"} /> },
      {
        path: "terms/:termId/preregistration_courses",
        element: <ManagerPreregistrationCourses />,
      },
      {
        path: "terms/:termId/registration_courses",
        element: <ManagerRegistrationCourses />,
      },
      {
        path: "terms/:termId/preregistration_courses/add",
        element: <AddCourse type="preregistration" />,
      },
      {
        path: "terms/:termId/registration_courses/add",
        element: <AddCourse type="registration" />,
      },
      {
        path: "course/:courseId/registrations",
        element: <ManagerCourseRegistrations />,
      },
      {
        path: "course/:courseId/preregistrations",
        element: <ManagerCoursePreregistrations />,
      },
      { path: "professors", element: <ManagerProfessors /> },
      { path: "students", element: <ManagerStudents /> },
    ],
  },
];

export default managerRoutes;
