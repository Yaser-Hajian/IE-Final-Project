import { apiBaseUrl } from "../../config";

const addTerm = async (termData) => {
  try {
    const response = await fetch(apiBaseUrl + `/term`, {
      method: "POST",
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

export default addTerm;
