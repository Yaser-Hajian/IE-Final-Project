import { apiBaseUrl } from "../../config";

const updateTerm = async (termId, termData) => {
  try {
    const response = await fetch(apiBaseUrl + `/term/${termId}`, {
      method: "PUT",
      body: JSON.stringify({ ...termData }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default updateTerm;
