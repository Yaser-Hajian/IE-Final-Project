import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getManager = async (managerId) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/manager/${managerId}`, {
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getManager;
