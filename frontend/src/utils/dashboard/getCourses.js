import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getCourses = async (coursesList = []) => {
  try {
    const queries = new URLSearchParams();
    queries.append("search", coursesList.join(","));

    const response = await fetch(
      apiBaseUrl + `/courses?${queries.toString()}`,
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

export default getCourses;
