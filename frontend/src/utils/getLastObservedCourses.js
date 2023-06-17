const getLastObservedCourses = () => {
  try {
    return JSON.parse(localStorage.getItem("lastObservedCourses")) ?? [];
  } catch (err) {
    return [];
  }
};

export default getLastObservedCourses;
