import { apiBaseUrl } from "../../config";

const getStudents = async () => {
  try {
    const response = await fetch(apiBaseUrl + `/students`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getStudents;
