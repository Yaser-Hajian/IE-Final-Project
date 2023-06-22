import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDataLoadedBefore: false,
  name: "",
  professor: null,
  course: null,
  examDate: null,
  classTimes: [],
  capacity: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    updateCourseData(preState, action) {
      return { ...preState, ...action.payload };
    },
    resetCourseData() {
      return initialState;
    },
  },
});

export const updateCourseData = courseSlice.actions.updateCourseData;
export const resetCourseData = courseSlice.actions.resetCourseData;

export { courseSlice };
