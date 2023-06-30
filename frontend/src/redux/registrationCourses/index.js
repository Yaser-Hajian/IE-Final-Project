import { createSlice } from "@reduxjs/toolkit";

const registrationCoursesSlice = createSlice({
  name: "registrationsCourses",
  initialState: {
    isDataLoadedBefore: false,
    registrationCourses: [],
  },
  reducers: {
    updateRegistrationCoursesData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateRegistrationCoursesData =
  registrationCoursesSlice.actions.updateRegistrationCoursesData;

export { registrationCoursesSlice };
