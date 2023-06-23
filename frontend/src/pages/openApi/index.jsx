import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { switchTheme } from "../../redux";
import { useDispatch } from "react-redux";

const OpenApi = () => {
  const dispatch = useDispatch();
  dispatch(switchTheme("light"));

  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <SwaggerUI url="/src/apis/main.yml" deepLinking />
    </div>
  );
};

export default OpenApi;
