import { apiBaseUrl } from "../../config";

const updateProfessor = async (professorId, professorData) => {
  try {
    const response = await fetch(
      apiBaseUrl + `/admin/professor/${professorId}`,
      {
        method: "PUT",
        body: JSON.stringify({ ...professorData }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "Error!" };
  }
};

export default updateProfessor;
