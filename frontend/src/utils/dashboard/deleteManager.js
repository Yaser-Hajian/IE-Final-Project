import { apiBaseUrl } from "../../config";

const deleteManager = async (managerId) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/manager/${managerId}`, {
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
export default deleteManager;
