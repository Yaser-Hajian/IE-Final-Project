import { createSlice } from "@reduxjs/toolkit";

const termIdSlice = createSlice({
  name: "termId",
  initialState: {
    isDataLoadedBefore: false,
    name: "",
  },
  reducers: {
    updateTermIdData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateTermIdData = termIdSlice.actions.updateTermIdData;

export { termIdSlice };
