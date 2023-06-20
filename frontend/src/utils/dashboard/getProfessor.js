import { apiBaseUrl } from "../../config";

const getProfessor = async (professorId) => {
  try {
    const response = await fetch(
      apiBaseUrl + `/admin/professor/${professorId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: true, errorMessage: "نتونستم به سرور وصل شم" };
  }
};

export default getProfessor;
