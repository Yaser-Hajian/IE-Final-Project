import { createSlice } from "@reduxjs/toolkit";

const meSlice = createSlice({
  name: "me",
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
    updateMeData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateMeData = meSlice.actions.updateMeData;

export { meSlice };
