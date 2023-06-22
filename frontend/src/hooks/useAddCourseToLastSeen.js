import { useEffect } from "react";
import { addCourseToLastSeen } from "../utils/lastSeen";

const useAddCourseToLastSeen = (courseId) => {
  useEffect(() => {
    addCourseToLastSeen(courseId);
  }, [courseId]);
};

export default useAddCourseToLastSeen;
