import LoginPage from "..";
import { CheckAuthentication } from "../../../components/checkAuthentication";

const loginRoutes = [
  {
    path: "/login",
    element: (
      <CheckAuthentication>
        <LoginPage />
      </CheckAuthentication>
    ),
  },
];

export default loginRoutes;
