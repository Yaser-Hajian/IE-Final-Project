import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getRegistrations = async (id) => {
  try {
    const response = await fetch(apiBaseUrl + `/term/${id}/registrations`, {
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};
export default getRegistrations;
