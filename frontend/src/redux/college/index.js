import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDataLoadedBefore: false, name: "", majors: [] };

const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    updateCollegeData(preState, action) {
      return { ...preState, ...action.payload };
    },
    resetCollegeData() {
      return { ...initialState };
    },
  },
});

export const updateCollegeData = collegeSlice.actions.updateCollegeData;
export const resetCollegeData = collegeSlice.actions.resetCollegeData;

export { collegeSlice };
