import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const addProfessor = async (professorData) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/professor`, {
      method: "POST",
      body: JSON.stringify({ professorData }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addProfessor;
