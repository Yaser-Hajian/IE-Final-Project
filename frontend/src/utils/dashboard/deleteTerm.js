import { apiBaseUrl } from "../../config";

const deleteTerm = async (id) => {
  try {
    const response = await fetch(apiBaseUrl + `/terms/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};
export default deleteTerm;
