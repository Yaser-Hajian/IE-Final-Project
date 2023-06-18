import { createSlice } from "@reduxjs/toolkit";

const registrationsSlice = createSlice({
  name: "registrations",
  initialState: {
    isDataLoadedBefore: false,
    registrations: [],
  },
  reducers: {
    updateRegistrationsData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateRegistrationsData =
  registrationsSlice.actions.updateRegistrationsData;

export { registrationsSlice };
