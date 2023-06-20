import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux";
import { theme } from "./styles/theme";
import { Route, Routes } from "react-router-dom";
import { CheckAuthentication } from "./components/checkAuthentication";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginPage from "./pages/login";
import StudentDashboard from "./pages/dashboard/studentDashboard";
import Home from "./components/dashboard/home/home";
import Terms from "./components/dashboard/terms/terms";
import PreregistrationCourses from "./pages/dashboard/studentDashboard/preregistration_courses";
import Preregistrations from "./pages/dashboard/studentDashboard/preregistrations";
import Registrations from "./pages/dashboard/studentDashboard/registrations";
import RegistrationCourses from "./pages/dashboard/studentDashboard/reregistration_courses";
import ProfessorDashboard from "./pages/dashboard/professorDashboard";
import ProfessorDashboardTermId from "./pages/dashboard/professorDashboard/terms[Id]";
import ProfessorDashboardCourseId from "./pages/dashboard/professorDashboard/course[id]";
import ManagerDashboard from "./pages/dashboard/manager";
import EditOrAddTerm from "./pages/dashboard/manager/editOrAddTerm";
import TermId from "./components/dashboard/terms[Id]/index";
import ManagerRegistrationCourses from "./pages/dashboard/manager/registration_courses";
import ManagerPreregistrationCourses from "./pages/dashboard/manager/preregistration_courses";
import ManagerCoursePreregistrations from "./pages/dashboard/manager/coursePreregistrations";
import ManagerCourseRegistrations from "./pages/dashboard/manager/courseRegistrations";
import ManagerProfessors from "./pages/dashboard/manager/professors";
import ManagerStudents from "./pages/dashboard/manager/students";
import ITDashboard from "./pages/dashboard/IT";
import ITStudents from "./pages/dashboard/IT/students";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer limit={3} bodyClassName={"toasts"} rtl />
        <Routes>
          <Route path="/" element={<CheckAuthentication />} />
          <Route
            path="/login"
            element={
              <CheckAuthentication>
                <LoginPage />
              </CheckAuthentication>
            }
          />

          <Route
            path="/dashboard/admin"
            element={
              <CheckAuthentication>
                <ITDashboard />
              </CheckAuthentication>
            }
          >
            <Route path="students" element={<ITStudents />} />
          </Route>

          <Route
            path="/dashboard/professor"
            element={
              <CheckAuthentication>
                <ProfessorDashboard />
              </CheckAuthentication>
            }
          >
            <Route path="" element={<Home userType={"professor"} />} />
            <Route path="terms" element={<Terms userType={"professor"} />} />

            <Route
              path="terms/:termId"
              element={<ProfessorDashboardTermId userType={"professor"} />}
            />
            <Route
              path="course/:courseId/registrations"
              element={<ProfessorDashboardCourseId />}
            />
          </Route>

          <Route
            path="/dashboard/manager"
            element={
              <CheckAuthentication>
                <ManagerDashboard />
              </CheckAuthentication>
            }
          >
            <Route path="" element={<Home userType={"manager"} />} />
            <Route path="terms" element={<Terms userType={"manager"} />} />
            <Route
              path="terms/edit/:termId"
              element={<EditOrAddTerm type={"edit"} />}
            />
            <Route
              path="terms/:termId"
              element={<TermId userType={"manager"} />}
            />
            <Route path="terms/add" element={<EditOrAddTerm type={"add"} />} />
            <Route
              path="terms/:termId/preregistration_courses"
              element={<ManagerPreregistrationCourses />}
            />
            <Route
              path="terms/:termId/registration_courses"
              element={<ManagerRegistrationCourses />}
            />

            <Route
              path="course/:courseId/registrations"
              element={<ManagerCourseRegistrations />}
            />
            <Route
              path="course/:courseId/preregistrations"
              element={<ManagerCoursePreregistrations />}
            />

            <Route path="professors" element={<ManagerProfessors />} />
            <Route path="students" element={<ManagerStudents />} />
          </Route>

          <Route
            path="/dashboard/student"
            element={
              <CheckAuthentication>
                <StudentDashboard />
              </CheckAuthentication>
            }
          >
            <Route path="" element={<Home userType={"student"} />} />
            <Route path="terms" element={<Terms userType={"student"} />} />
            <Route
              path="terms/:termId"
              element={<TermId userType={"student"} />}
            />

            <Route
              path="terms/:termId/preregistration_courses"
              element={<PreregistrationCourses />}
            />
            <Route
              path="terms/:termId/preregistrations"
              element={<Preregistrations />}
            />
            <Route
              path="terms/:termId/registrations"
              element={<Registrations />}
            />
            <Route
              path="terms/:termId/registration_courses"
              element={<RegistrationCourses />}
            />
          </Route>
          <Route path="*" element={<h4>NOT FOUND 404</h4>} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
