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
import App from './App';

const store = configureStore({
  reducer: {
    notice: noticeReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

