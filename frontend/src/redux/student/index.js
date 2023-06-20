import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDataLoadedBefore: false,
  name: "",
  familyName: "",
  nationId: "",
  studentId: "",
  passedCourses: [],
  college: "",
  major: "",
  entryYear: "",
  professor: "",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updateStudentData(preState, action) {
      return { ...preState, ...action.payload };
    },
    resetStudentData() {
      return { ...initialState };
    },
  },
});

export const updateStudentData = studentSlice.actions.updateStudentData;
export const resetStudentData = studentSlice.actions.resetStudentData;

export { studentSlice };
