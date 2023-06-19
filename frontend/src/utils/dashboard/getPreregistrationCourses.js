import { apiBaseUrl } from "../../config";

const getPreregistrationCourses = async (
  termId,
  searchQuery = "",
  sortType = ""
) => {
  try {
    const queries = new URLSearchParams();
    searchQuery != "" && queries.append("search", searchQuery);
    sortType != "" && queries.append("sort", sortType);
    const response = await fetch(
      apiBaseUrl +
        `/term/${termId}/preregistration_courses?${queries.toString()}`,
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

export default getPreregistrationCourses;
