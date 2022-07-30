import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import noticeReducer from './reducers/noticeReducer';
import userReducer from './reducers/userReducer';

import App from './App';
import MyPosts from './appComponents/MyPosts';
import SignUp from './appComponents/SignUp';
import ExchangePage from './appComponents/ExchangePage';

const store = configureStore({
  reducer: {
    notice: noticeReducer,
    user: userReducer
  }, 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts" element={<MyPosts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts/:postId" element={<ExchangePage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

