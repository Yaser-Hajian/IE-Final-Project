import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const addCourse = async (type, termId, courseData) => {
  try {
    const url = `/term/${termId}/${
      type == "preregistration" ? "preregistration" : "registration"
    }`;

    const response = await fetch(apiBaseUrl + url, {
      method: "POST",
      body: JSON.stringify({ ...courseData }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default addCourse;
