import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import { setNotice, clearNotice } from "./noticeReducer";

const initialState = null

const userSlice = createSlice({
    name: "user", 
    initialState, 
    reducers: {
        setUser(state, action) {
            return action.payload
        }, 
        clearUser(state, action) {
            return null 
        }
    }
})

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password });
    loginService.setToken(user.token);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    dispatch(setUser(user));
  };
};

export const logout = () => {
    return async dispatch => {
        window.localStorage.clear();
        dispatch(clearUser())
        dispatch(setNotice(["Successfully logged out", "success"]));
        setTimeout(() => {
          dispatch(clearNotice());
        }, 5000);
    }
}


export default userSlice.reducer
export const { setUser, clearUser } = userSlice.actions; 