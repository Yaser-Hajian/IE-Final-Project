import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getTerms = async (termsId = []) => {
  try {
    const queries = new URLSearchParams();
    termsId.length != 0 && queries.append("search", termsId.join(","));
    const response = await fetch(apiBaseUrl + `/terms?${queries.toString()}`, {
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getTerms;
