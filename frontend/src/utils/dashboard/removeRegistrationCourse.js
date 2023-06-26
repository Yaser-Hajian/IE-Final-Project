import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const removeRegistrationCourse = async (termId, courseId) => {
  try {
    const response = await fetch(apiBaseUrl + `/term/${termId}/registration`, {
      method: "DELETE",
      body: JSON.stringify({ courseId }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default removeRegistrationCourse;
