import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
/* LAYOUT COMPONENTS */
import Navbar from "../components/layout/Navbar";
import Landing from "../components/layout/Landing";
import Footer from "../components/layout/Footer";

/* AUTH COMPONENTS */
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

/* DASHBOARD COMPONENTS */
import Dashboard from "../components/dashboard/Dashboard";

import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Navbar />
      <Switch>
        <PublicRoute
          path="/"
          component={Landing}
          exact={true}
          no_container={true}
        />
        <PublicRoute path="/register" component={Register} exact={true} />
        <PublicRoute path="/login" component={Login} exact={true} />
        <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
