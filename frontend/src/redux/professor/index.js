import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDataLoadedBefore: false,
  name: "",
  familyName: "",
  nationId: "",
  professorId: "",
  college: "",
  major: "",
  entryYear: "",
  level: "",
};

const professorSlice = createSlice({
  name: "professor",
  initialState: initialState,
  reducers: {
    updateProfessorData(preState, action) {
      return { ...preState, ...action.payload };
    },
    resetProfessorData() {
      return { ...initialState };
    },
  },
});

export const updateProfessorData = professorSlice.actions.updateProfessorData;

export const resetProfessorData = professorSlice.actions.resetProfessorData;

export { professorSlice };
