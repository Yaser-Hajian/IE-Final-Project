import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDataLoadedBefore: false,
  name: "",
  familyName: "",
  nationId: "",
  managerId: "",
  college: "",
  major: "",
  entryYear: "",
  level: "",
};

const managerSlice = createSlice({
  name: "manager",
  initialState: initialState,
  reducers: {
    updateManagerData(preState, action) {
      return { ...preState, ...action.payload };
    },
    resetManagerData() {
      return { ...initialState };
    },
  },
});

export const updateManagerData = managerSlice.actions.updateManagerData;

export const resetManagerData = managerSlice.actions.resetManagerData;

export { managerSlice };
