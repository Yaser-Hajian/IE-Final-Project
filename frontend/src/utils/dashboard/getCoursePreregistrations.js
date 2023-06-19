import { apiBaseUrl } from "../../config";

const getCoursePreregistrations = async (id, searchQ, sortType) => {
  try {
    const queries = new URLSearchParams();
    searchQ != "" && queries.append("search", searchQ);
    sortType != "" && queries.append("sort", sortType);
    const response = await fetch(
      apiBaseUrl + `/course/${id}/preregistrations?${queries.toString()}`,
      {
        headers: { "Content-Type": "application/json" },
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
