import { apiBaseUrl } from "../../config";

const getTerms = async (termsId = []) => {
  try {
    const query = termsId.length == 0 ? "" : `?search=${termsId.join(",")}`;
    const response = await fetch(apiBaseUrl + `/terms${query}`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getTerms;
