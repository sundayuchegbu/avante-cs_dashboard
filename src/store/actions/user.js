import { userActions } from "../reducers/usersReducer";
export const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
};
