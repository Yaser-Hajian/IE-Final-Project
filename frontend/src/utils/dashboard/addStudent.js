import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const addStudent = async (studentData) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/student`, {
      method: "POST",
      body: JSON.stringify({ studentData }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addStudent;
