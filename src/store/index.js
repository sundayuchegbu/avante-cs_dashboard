import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/usersReducer";

const userinfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const initialState = {
  user: { userInfo: userinfoFromStorage },
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: initialState,
});
export default store;
