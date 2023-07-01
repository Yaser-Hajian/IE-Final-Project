import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  students: [],
  professors: [],
  startDate: null,
  endDate: null,
};
const editOrAddTermSlice = createSlice({
  name: "editOrAddTerm",
  initialState,
  reducers: {
    updateEditOrAddTermData(preState, action) {
      return { ...preState, ...action.payload };
    },
    resetEditOrAddTermData() {
      return initialState;
    },
  },
});

export const updateEditOrAddTermData =
  editOrAddTermSlice.actions.updateEditOrAddTermData;

export const resetEditOrAddTermData =
  editOrAddTermSlice.actions.resetEditOrAddTermData;

export { editOrAddTermSlice };
