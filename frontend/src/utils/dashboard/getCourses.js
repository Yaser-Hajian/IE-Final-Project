import { apiBaseUrl } from "../../config";

const getCourses = async (courseId = []) => {
  try {
    const query = courseId.length == 0 ? "" : `?search=${courseId.join(",")}`;
    const response = await fetch(apiBaseUrl + `/courses${query}`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getCourses;
