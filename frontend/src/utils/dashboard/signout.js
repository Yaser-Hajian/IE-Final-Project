import { apiBaseUrl } from "../../config";

const signout = async (token) => {
  try {
    const response = await fetch(apiBaseUrl + "/signout", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default signout;