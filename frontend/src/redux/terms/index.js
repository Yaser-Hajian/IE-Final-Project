import { createSlice } from "@reduxjs/toolkit";

const termsSlice = createSlice({
  name: "terms",
  initialState: {
    terms: [],
    isDataLoadedBefore: false,
  },
  reducers: {
    updateTermsData(preState, action) {
      return { ...preState, ...action.payload };
    },
  },
});

export const updateTermsData = termsSlice.actions.updateTermsData;

export { termsSlice };
