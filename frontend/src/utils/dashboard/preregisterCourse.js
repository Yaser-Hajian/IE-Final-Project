import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const preregisterCourse = async (courseId, studentId) => {
  try {
    const response = await fetch(
      apiBaseUrl + `/course/preregister/${courseId}`,
      {
        method: "POST",
        body: JSON.stringify({ studentId }),
        headers: { "Content-Type": "application/json", ...generateHeaders() },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default preregisterCourse;
