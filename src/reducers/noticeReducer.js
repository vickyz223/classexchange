import { createSlice } from "@reduxjs/toolkit";

const initialState = ["", "success"];

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotice(state, action) {
        return [action.payload[0], action.payload[1]];
    },
    clearNotice(state, action) {
        return ""
    }
  }
});

export default noticeSlice.reducer
export const {setNotice, clearNotice} = noticeSlice.actions 
