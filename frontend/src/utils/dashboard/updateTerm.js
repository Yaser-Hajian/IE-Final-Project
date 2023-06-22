import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const updateTerm = async (termId, termData) => {
  try {
    const response = await fetch(apiBaseUrl + `/term/${termId}`, {
      method: "PUT",
      body: JSON.stringify({ ...termData }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default updateTerm;
