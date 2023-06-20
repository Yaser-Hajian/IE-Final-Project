import { apiBaseUrl } from "../../config";

const getManager = async (managerId) => {
  try {
    console.log("HERE", managerId);
    const response = await fetch(apiBaseUrl + `/admin/manager/${managerId}`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getManager;
