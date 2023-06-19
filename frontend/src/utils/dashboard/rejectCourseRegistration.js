import { apiBaseUrl } from "../../config";

const rejectCourseRegistration = async (registrationId) => {
  try {
    const response = await fetch(
      apiBaseUrl + `/registration/${registrationId}`,
      {
        method: "PUT",
        body: JSON.stringify({ isPass: false }),
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

export default rejectCourseRegistration;
