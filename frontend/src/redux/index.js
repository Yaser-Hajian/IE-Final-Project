import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { loggedUserSlice } from "./loggedUser";
import { homeSlice } from "./home";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    theme: "light",
  },
});

const rootReducer = combineReducers({
  loggedUser: loggedUserSlice.reducer,
  global: globalSlice.reducer,
  home: homeSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
