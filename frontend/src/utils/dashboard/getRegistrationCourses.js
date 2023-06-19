import { apiBaseUrl } from "../../config";

const getRegistrationCourses = async (id, searchQuery) => {
  try {
    const queries = new URLSearchParams();
    searchQuery != "" && queries.append("search", searchQuery);
    const response = await fetch(
      apiBaseUrl + `/term/${id}/registration_courses?${queries.toString()}`,
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
export default getRegistrationCourses;
