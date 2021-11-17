import React, { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import { createBrowserHistory } from "history";
import Header from "./components/Header";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
// const AuthLazy = lazy(() => import("./components/AuthApp"));
// const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co"
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSigned] = useState(false);
  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    } else {
      history.push();
    }
  }, [isSignedIn]);
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSigned(false)}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {/*               <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSigned(true)} />
              </Route>
              <Route path="/dashboard">
                <DashboardLazy />
              </Route> */}
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
