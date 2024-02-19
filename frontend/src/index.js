// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import { CountryProvider } from './component/Context/CountryContext';
import { StateProvider } from './component/Context/StateContext';
import { CityProvider} from './component/Context/CityContext'
import { Provider } from 'react-redux';
import store from './Redux/store';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <CountryProvider>
                <StateProvider>
                    <CityProvider>
                        <App />
                    </CityProvider>
                </StateProvider>
            </CountryProvider>
        </Provider>
    </BrowserRouter>
);
