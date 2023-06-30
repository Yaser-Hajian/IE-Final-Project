const addTermToLastSeen = (termId) => {
  const lastSeen = getLastSeen();
  const isTermIdExist = lastSeen.terms.filter((t) => t == termId).length != 0;
  if (!isTermIdExist) {
    const terms = lastSeen.terms;
    terms.unshift(termId);
    localStorage.setItem(
      "lastSeen",
      JSON.stringify({ ...lastSeen, terms: terms.slice(0, 3) })
    );
  }
};

const addCourseToLastSeen = (courseId) => {
  const lastSeen = getLastSeen();
  const isCourseExist =
    lastSeen.courses.filter((t) => t == courseId).length != 0;
  if (!isCourseExist) {
    const courses = lastSeen.courses;
    courses.unshift(courseId);
    localStorage.setItem(
      "lastSeen",
      JSON.stringify({ ...lastSeen, courses: courses.slice(0, 3) })
    );
  }
};

const getLastSeen = () => {
  const isExist = localStorage.getItem("lastSeen");
  if (isExist == null) {
    localStorage.setItem(
      "lastSeen",
      JSON.stringify({ terms: [], courses: [] })
    );
    return JSON.parse(localStorage.getItem("lastSeen"));
  }
  return JSON.parse(isExist);
};

export { addCourseToLastSeen, addTermToLastSeen };
