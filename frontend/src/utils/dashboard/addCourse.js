import { apiBaseUrl } from "../../config";

const addCourse = async (type, termId, courseData) => {
  try {
    const url =
      type == "preregistration"
        ? `/term/${termId}/preregistration`
        : `/term/${termId}/registration`;
    const response = await fetch(apiBaseUrl + url, {
      method: "POST",
      body: JSON.stringify({ ...courseData }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addCourse;