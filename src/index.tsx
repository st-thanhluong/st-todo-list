import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import rootReducer from "./reducers";
import {Provider} from 'react-redux';
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import appMiddleware from "./index.middleware";
import createSagaMiddleware from "redux-saga";
import ReactDOM from "react-dom";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
    immutableCheck: false
}), sagaMiddleware];
const store = configureStore({
    reducer: rootReducer,
    middleware
})
sagaMiddleware.run(appMiddleware)

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
