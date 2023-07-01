import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
};
const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    updateMeData(preState, action) {
      return { ...preState, ...action.payload };
    },
    resetMeData() {
      return initialState;
    },
  },
});

export const updateMeData = meSlice.actions.updateMeData;
export const resetMeDate = meSlice.actions.resetMeData;
export { meSlice };
