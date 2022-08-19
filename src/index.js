import React from "react";
import ReactDOM from "react-dom/client";

import { HashRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import noticeReducer from "./reducers/noticeReducer";
import userReducer from "./reducers/userReducer";

import App from "./App";
import MyPosts from "./appComponents/MyPosts";
import SignUp from "./appComponents/SignUp";
import ExchangePage from "./appComponents/ExchangePage";

const store = configureStore({
  reducer: {
    notice: noticeReducer,
    user: userReducer,
  },
});

const loggedUserJSON = window.localStorage.getItem("loggedUser");
let user;
if (loggedUserJSON) {
  user = JSON.parse(loggedUserJSON);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts/:postId" element={<ExchangePage />} />
      </Routes>
    </HashRouter>
  </Provider>
);
