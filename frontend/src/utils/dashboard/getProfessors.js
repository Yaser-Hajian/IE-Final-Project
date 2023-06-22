import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getProfessors = async (searchQuery) => {
  try {
    const queries = new URLSearchParams();
    searchQuery != "" && queries.append("search", searchQuery);
    const response = await fetch(
      apiBaseUrl + `/professors?${queries.toString()}`,
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

export default getProfessors;
