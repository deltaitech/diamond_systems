import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./slices/store.js";
import "./i18n";

import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
      
    </Provider>
  </BrowserRouter>
</React.StrictMode>
)
