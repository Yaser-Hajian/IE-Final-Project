import { createSlice } from "@reduxjs/toolkit";

const preregistrationCoursesSlice = createSlice({
  name: "registrations",
  initialState: {
    isDataLoadedBefore: false,
    preregistrationCourses: [],
  },
  reducers: {
    updatePreregistrationCoursesData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updatePreregistrationCoursesData =
  preregistrationCoursesSlice.actions.updatePreregistrationCoursesData;

export { preregistrationCoursesSlice };
