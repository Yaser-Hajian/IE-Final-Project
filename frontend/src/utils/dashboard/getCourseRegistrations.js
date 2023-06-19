import { apiBaseUrl } from "../../config";

const getCourseRegistrations = async (id, searchQ) => {
  try {
    const queries = new URLSearchParams();
    searchQ == "" && queries.append("search", searchQ);
    const response = await fetch(
      apiBaseUrl + `/course/${id}/registrations?${queries.toString()}`,
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
export default getCourseRegistrations;