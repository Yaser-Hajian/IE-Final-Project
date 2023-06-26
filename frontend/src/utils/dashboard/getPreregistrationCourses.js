import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getPreregistrationCourses = async (termId) => {
  try {
    const response = await fetch(
      apiBaseUrl + `/term/${termId}/preregistration_courses`,
      {
        headers: { "Content-Type": "application/json", ...generateHeaders() },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getPreregistrationCourses;
