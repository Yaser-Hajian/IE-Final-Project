import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    isDataLoadedBefore: false,
    courses: [],
  },
  reducers: {
    updateCoursesData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateCoursesData = coursesSlice.actions.updateCoursesData;

export { coursesSlice };
