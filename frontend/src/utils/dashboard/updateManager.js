import { apiBaseUrl } from "../../config";

const updateManager = async (managerId, managerData) => {
  try {
    const response = await fetch(apiBaseUrl + `/admin/manager/${managerId}`, {
      method: "PUT",
      body: JSON.stringify({ ...managerData }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default updateManager;
