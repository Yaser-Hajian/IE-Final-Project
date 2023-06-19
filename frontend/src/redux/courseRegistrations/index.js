import { createSlice } from "@reduxjs/toolkit";

const courseRegistrationsSlice = createSlice({
  name: "courseRegistrations",
  initialState: {
    isDataLoadedBefore: false,
    courseRegistrations: [],
  },
  reducers: {
    updateCourseRegistrationsData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateCourseRegistrationsData =
  courseRegistrationsSlice.actions.updateCourseRegistrationsData;

export { courseRegistrationsSlice };
