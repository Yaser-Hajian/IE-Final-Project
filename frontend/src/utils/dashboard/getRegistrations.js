import { apiBaseUrl } from "../../config";

const getRegistrations = async (id, searchQ, sortType) => {
  try {
    const queries = new URLSearchParams();
    searchQ == "" && queries.append("search", searchQ);
    sortType !== null && queries.append("sort", sortType);
    const response = await fetch(
      apiBaseUrl + `/term/${id}/registrations?${queries.toString()}`,
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
export default getRegistrations;
