import { createSlice } from "@reduxjs/toolkit";

const courseIdSlice = createSlice({
  name: "courseId",
  initialState: {
    isDataLoadedBefore: false,
    courseRegistrations: [],
    name: "",
    capacity: "",
    occupiedCapacity: "",
  },
  reducers: {
    updateCourseIdData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateCourseIdData = courseIdSlice.actions.updateCourseIdData;

export { courseIdSlice };
