import { createSlice } from "@reduxjs/toolkit";

const majorsSlice = createSlice({
  name: "majors",
  initialState: {
    isDataLoadedBefore: false,
    majors: [],
  },
  reducers: {
    updateMajorsData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateMajorsData = majorsSlice.actions.updateMajorsData;

export { majorsSlice };
