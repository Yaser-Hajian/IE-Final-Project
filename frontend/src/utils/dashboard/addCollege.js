import { apiBaseUrl } from "../../config";

const addCollege = async (collegeData) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/college`, {
      method: "POST",
      body: JSON.stringify({ ...collegeData }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addCollege;
