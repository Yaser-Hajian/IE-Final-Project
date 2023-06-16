import { configureStore, createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    theme: "light",
  },
});

const store = configureStore({
  reducer: globalSlice.reducer,
});

export { store };
