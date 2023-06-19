import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    isDataLoadedBefore: false,
    name: "",
    professor: null,
    course: null,
    examDate: null,
    classTimes: [],
    capacity: null,
  },
  reducers: {
    updateCourseData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateCourseData = courseSlice.actions.updateCourseData;

export { courseSlice };
