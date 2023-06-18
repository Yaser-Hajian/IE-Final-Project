import { apiBaseUrl } from "../../config";

const getPreregistrations = async (id, searchQuery) => {
  try {
    const query = searchQuery == "" ? "" : `?search=${searchQuery}`;
    const response = await fetch(
      apiBaseUrl + `/term/${id}/preregistrations${query}`,
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

export default getPreregistrations;
