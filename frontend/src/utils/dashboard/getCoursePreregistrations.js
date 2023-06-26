import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getCoursePreregistrations = async (id) => {
  try {
    const response = await fetch(
      apiBaseUrl + `/course/${id}/preregistrations`,
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
export default getCoursePreregistrations;
