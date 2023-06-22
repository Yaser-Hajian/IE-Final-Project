import { apiBaseUrl } from "../../config";
import generateHeaders from "../generateHeaders";

const getLoggedUserData = async (token) => {
  try {
    const response = await fetch(apiBaseUrl + "/loggedUser", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json", ...generateHeaders() },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getLoggedUserData;
