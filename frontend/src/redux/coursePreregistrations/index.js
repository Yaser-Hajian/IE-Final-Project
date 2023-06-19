import { createSlice } from "@reduxjs/toolkit";

const coursePreregistrationsSlice = createSlice({
  name: "coursePreregistrations",
  initialState: {
    isDataLoadedBefore: false,
    coursePreregistrations: [],
  },
  reducers: {
    updateCoursePreregistrationsData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateCoursePreregistrationsData =
  coursePreregistrationsSlice.actions.updateCoursePreregistrationsData;

export { coursePreregistrationsSlice };
