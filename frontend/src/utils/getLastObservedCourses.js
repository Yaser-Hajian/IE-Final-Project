const getLastObservedCourses = () => {
  try {
    return JSON.parse(localStorage.getItem("lastSeen")).courses ?? [];
  } catch (err) {
    return [];
  }
};

export default getLastObservedCourses;
