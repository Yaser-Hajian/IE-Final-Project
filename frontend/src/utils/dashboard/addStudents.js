import { apiBaseUrl } from "../../config";

const addStudents = async (students) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/students`, {
      method: "POST",
      body: JSON.stringify({ students }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addStudents;
