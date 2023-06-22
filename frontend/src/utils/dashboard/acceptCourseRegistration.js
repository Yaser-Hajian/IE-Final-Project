import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const acceptCourseRegistration = async (registrationId) => {
  try {
    const response = await fetch(
      apiBaseUrl + `/registration/${registrationId}`,
      {
        method: "PUT",
        body: JSON.stringify({ isPass: true }),
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

export default acceptCourseRegistration;
