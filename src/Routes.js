import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login"
import NotFound from "./containers/NotFound"
import AppliedRoute from "./components/AppliedRoute";
import Transactions from "./containers/Transactions";
import NewTransaction from "./containers/NewTransaction";
import Summary from "./containers/Summary";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Transactions} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/transaction/new" exact component={NewTransaction} appProps={appProps} />
      <AppliedRoute path="/summary" exact component={Summary} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}