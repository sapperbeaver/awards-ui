import React, { useState } from "react";
import "./App.css";
import {  Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { mainLinks } from "./Links";
import { StoreContext } from "../src/StoreContext";
import { Routes } from "./Routes";
import { createBrowserHistory } from "history";


const authGuard = ({ component, ...props }) => {
  const isToken = !!localStorage.getItem("token");
  if (isToken && props.isAuth() !== false) {
    return <component {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};
class LocalStorageTokenProxy {

    set token(v) {
      localStorage.setItem("token", v);
    }

    get token() {
      return localStorage.getItem("token");
    }

    set permission(v) {
      localStorage.setItem('permission', v)
    }

    get permission() {
      return localStorage.getItem('permission')
    }

}
const history = createBrowserHistory();
function App() {
  const [ls] = useState(new LocalStorageTokenProxy());
  return (
    <BrowserRouter history={history}>
      <StoreContext.Provider
        value={ls}
      >
        <Routes links={mainLinks} defaultTo="/filter" forbiddenTo="/login" />
      </StoreContext.Provider>
    </BrowserRouter>
  );
}
export default App;
