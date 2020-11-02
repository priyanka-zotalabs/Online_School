import { combineReducers, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import auth from "./reducer/auth";
import formRequest from "./reducer/formRequest";
import registerCourse from "./reducer/registerCourse";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import addProduct from "./reducer/addProduct";
import course from "./reducer/courses";
import courseModule from "./reducer/courseModule";
import teacherCourse from "./reducer/teacherCourse";
import teacherModule from "./reducer/teacherModule";
import teacherCurrentCourse from "./reducer/teacherCurrentCourse";
import studentCurrentCourse from "./reducer/studentCurrentCourse";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import paymentDetails from "./reducer/paymentDetails";
import adminCourse from "./reducer/adminCourse";

let reducers = combineReducers({
  auth,
  formRequest,
  registerCourse,
  addProduct,
  course,
  courseModule,
  teacherCourse,
  teacherModule,
  teacherCurrentCourse,
  studentCurrentCourse,
  paymentDetails,
  adminCourse,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [
    "auth",
    "teacherCourse",
    "teacherModule",
    "teacherCurrentCourse",
    "course",
    "courseModule",
    "studentCurrentCourse",
    "paymentDetails",
    "adminCourse",
  ], //only navigation will be persisted 'teacherCourse','teacherModule','teacherCurrentCourse'
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, reducers);
let logger = createLogger({ collapsed: true });
let middleware = applyMiddleware(logger);

if (window.__REDUX_DEVTOOLS_EXTENSION__)
  middleware = window.__REDUX_DEVTOOLS_EXTENSION__();

let store = createStore(persistedReducer, middleware);

export default store;
