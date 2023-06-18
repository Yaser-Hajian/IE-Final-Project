import { apiBaseUrl } from "../../config";

const cancelPreregisterCourse = async (courseId) => {
  try {
    const response = await fetch(
      apiBaseUrl + `/course/preregister/${courseId}`,
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

export default cancelPreregisterCourse;
