import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const addManagers = async (managers) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/managers`, {
      method: "POST",
      body: JSON.stringify({ professors: managers }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addManagers;
