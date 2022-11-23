import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/selectinput" component={SelectInput} />
        <Route path="/mapfields" component={MapFields} />
        <Route path="/editdata" component={EditData} />
      </Switch>
    </BrowserRouter>
  );
}