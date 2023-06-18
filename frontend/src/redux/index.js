import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { loggedUserSlice } from "./loggedUser";
import { homeSlice } from "./home";
import { termsSlice } from "./terms";
import { termIdSlice } from "./termId";
import { preregistrationCoursesSlice } from "./preregistrationCourses";
import { preregistrationsSlice } from "./preregistrations";
import { registrationsSlice } from "./registrations";
import { registrationCoursesSlice } from "./registrationCourses";

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
  terms: termsSlice.reducer,
  termId: termIdSlice.reducer,
  preregistrationCourses: preregistrationCoursesSlice.reducer,
  preregistrations: preregistrationsSlice.reducer,
  registrations: registrationsSlice.reducer,
  registrationCourses: registrationCoursesSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
