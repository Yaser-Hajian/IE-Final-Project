import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { switchTheme } from "../../redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const OpenApi = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(switchTheme("light"));
  }, [dispatch]);
  return <SwaggerUI url="/src/apis/main.yml" />;
};

export default OpenApi;
