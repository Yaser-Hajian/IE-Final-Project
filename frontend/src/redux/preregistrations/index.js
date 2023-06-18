import { createSlice } from "@reduxjs/toolkit";

const preregistrationsSlice = createSlice({
  name: "preregistrations",
  initialState: {
    isDataLoadedBefore: false,
    preregistrations: [],
  },
  reducers: {
    updatePreregistrationsData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updatePreregistrationsData =
  preregistrationsSlice.actions.updatePreregistrationsData;

export { preregistrationsSlice };
