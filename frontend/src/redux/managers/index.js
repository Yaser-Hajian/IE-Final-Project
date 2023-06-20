import { createSlice } from "@reduxjs/toolkit";

const managersSlice = createSlice({
  name: "managers",
  initialState: {
    isDataLoadedBefore: false,
    managers: [],
  },
  reducers: {
    updateManagersData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateManagersData = managersSlice.actions.updateManagersData;

export { managersSlice };
