import { apiBaseUrl } from "../../config";

const getMajors = async () => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/majors`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};
export default getMajors;
