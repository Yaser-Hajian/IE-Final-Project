import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const addManager = async (managerData) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/manager`, {
      method: "POST",
      body: JSON.stringify({ ...managerData }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addManager;
