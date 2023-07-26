import { createSlice } from "@reduxjs/toolkit";

const userIntialState = { userInfo: null };
const userSlice = createSlice({
  name: "user",
  initialState: userIntialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetUserInfo(state, action) {
      state.userInfo = null;
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
