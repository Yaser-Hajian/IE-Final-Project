import { createSlice } from "@reduxjs/toolkit";

const professorsSlice = createSlice({
  name: "professors",
  initialState: {
    isDataLoadedBefore: false,
    professors: [],
  },
  reducers: {
    updateProfessorsData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateProfessorsData =
  professorsSlice.actions.updateProfessorsData;

export { professorsSlice };
