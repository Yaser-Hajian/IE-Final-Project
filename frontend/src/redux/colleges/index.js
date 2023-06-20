import { createSlice } from "@reduxjs/toolkit";

const collegesSlice = createSlice({
  name: "colleges",
  initialState: {
    isDataLoadedBefore: false,
    colleges: [],
  },
  reducers: {
    updateCollegesData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateCollegesData = collegesSlice.actions.updateCollegesData;

export { collegesSlice };
