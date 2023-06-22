import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const addProfessors = async (professors) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/professors`, {
      method: "POST",
      body: JSON.stringify({ professors }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addProfessors;
