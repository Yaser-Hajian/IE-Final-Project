import { createSlice } from "@reduxjs/toolkit";

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    isDataLoadedBefore: false,
    students: [],
  },
  reducers: {
    updateStudentsData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateStudentsData = studentsSlice.actions.updateStudentsData;

export { studentsSlice };
