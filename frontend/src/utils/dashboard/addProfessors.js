import { apiBaseUrl } from "../../config";

const addProfessors = async (professors) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/professors`, {
      method: "POST",
      body: JSON.stringify({ professors }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addProfessors;
