import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const addStudents = async (students) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/students`, {
      method: "POST",
      body: JSON.stringify({ students }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addStudents;
