import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getProfessors = async () => {
  try {
    const response = await fetch(apiBaseUrl + `/professors`, {
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getProfessors;
