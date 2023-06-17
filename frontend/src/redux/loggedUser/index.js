import { createSlice } from "@reduxjs/toolkit";

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: {
    name: "",
    familyName: "",
    studentId: "",
    email: "",
    tel: "",
    avg: "",
    entranceTerm: "",
    entranceYear: "",
    grade: "",
    field: "",
    collage: "",
    isDataLoadedBefore: false,
  },
  reducers: {
    updateLoggedUserData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateLoggedUserData =
  loggedUserSlice.actions.updateLoggedUserData;

export { loggedUserSlice };
