import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    lastObservedTerms: [],
    lastObservedCourses: [],
    isDataLoadedBefore: false,
  },
  reducers: {
    updateHomeData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateHomeData = homeSlice.actions.updateHomeData;

export { homeSlice };
