import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Donate from "../pages/Donate";
import ToastListener from "../components/ToastListner";

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Donate} key={'donate page'} />
      </Switch>
      <ToastListener />
    </BrowserRouter>
  )
}