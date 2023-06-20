import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { loggedUserSlice } from "./loggedUser";
import { homeSlice } from "./home";
import { termsSlice } from "./terms";
import { termIdSlice } from "./termId";
import { preregistrationCoursesSlice } from "./preregistrationCourses";
import { preregistrationsSlice } from "./preregistrations";
import { registrationsSlice } from "./registrations";
import { registrationCoursesSlice } from "./registrationCourses";
import { courseIdSlice } from "./courseId";
import { editOrAddTermSlice } from "./editOrAddTerm";
import { studentsSlice } from "./students";
import { coursePreregistrationsSlice } from "./coursePreregistrations";
import { courseSlice } from "./course";
import { courseRegistrationsSlice } from "./courseRegistrations";
import { professorsSlice } from "./professors";
import { coursesSlice } from "./courses";
import { managersSlice } from "./managers";

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
  courseId: courseIdSlice.reducer,
  editOrAddTerm: editOrAddTermSlice.reducer,
  students: studentsSlice.reducer,
  coursePreregistrations: coursePreregistrationsSlice.reducer,
  courseRegistrations: courseRegistrationsSlice.reducer,
  course: courseSlice.reducer,
  professors: professorsSlice.reducer,
  courses: coursesSlice.reducer,
  managers: managersSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
