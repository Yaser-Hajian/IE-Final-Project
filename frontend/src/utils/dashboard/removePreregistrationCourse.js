import { apiBaseUrl } from "../../config";

const removePreregistrationCourse = async (termId, courseId) => {
  try {
    const response = await fetch(
      apiBaseUrl + `/term/${termId}/preregistration`,
      {
        method: "DELETE",
        body: JSON.stringify({ courseId }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default removePreregistrationCourse;
