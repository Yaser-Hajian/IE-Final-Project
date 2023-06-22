import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const updateStudent = async (studentId, studentData) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/student/${studentId}`, {
      method: "PUT",
      body: JSON.stringify({ ...studentData }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default updateStudent;
