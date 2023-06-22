import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getCourseRegistrations = async (id, searchQ, sortType = "") => {
  try {
    const queries = new URLSearchParams();
    searchQ != "" && queries.append("search", searchQ);
    sortType != "" && queries.append("sort", sortType);
    const response = await fetch(
      apiBaseUrl + `/course/${id}/registrations?${queries.toString()}`,
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
export default getCourseRegistrations;
