import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const cancelRegisterCourse = async (courseId) => {
  try {
    const response = await fetch(apiBaseUrl + `/course/register/${courseId}`, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default cancelRegisterCourse;
