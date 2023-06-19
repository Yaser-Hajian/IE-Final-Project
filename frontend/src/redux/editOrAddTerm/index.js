import { createSlice } from "@reduxjs/toolkit";

const editOrAddTermSlice = createSlice({
  name: "editOrAddTerm",
  initialState: {
    name: "",
    students: [],
    professors: [],
    startDate: null,
    endDate: null,
  },
  reducers: {
    updateEditOrAddTermData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateEditOrAddTermData =
  editOrAddTermSlice.actions.updateEditOrAddTermData;

export { editOrAddTermSlice };
