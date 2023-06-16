import { apiBaseUrl } from "../../config";

const login = async (username, password) => {
  try {
    const response = await fetch(apiBaseUrl + "/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default login;
