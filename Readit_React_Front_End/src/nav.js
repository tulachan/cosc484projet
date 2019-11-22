import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Start from "./Start";
import FrontPage from "./frontpage";
import Search from "./search";
import Confirm from "./confirm";
import Login from "./login";
import UsersPage from "./UsersPage";
import Signup from "./signup";
import SuccessfulSignup from './successsfulSignup';

function Nav()
{

    return(
      //This first div is the top navigation bar, the second div is the router for pages
      <Router>
        <div>
          <Link to="/">
            <button className="login-butt"> Home </button>
          </Link>
          <Link to="/frontpage">
            <button className="login-butt"> Front Page </button>
          </Link>
          <Link to="/search">
            <button className="login-butt"> Find Subreadit </button>
          </Link>
      </div>
        <div>
          <Switch>
            <Route path="/" exact> <Start /> </Route>
            <Route path="/login"> <Login /> </Route>
            <Route path="/confirm"> <Confirm /> </Route>
            <Route path="/frontpage"> <FrontPage /> </Route>
            <Route path="/search"> <Search /> </Route>
            <Route path="/UsersPage"> <UsersPage /> </Route>
            <Route path="/signup"> <Signup /> </Route>
            <Route path="/successfulSignup"> <SuccessfulSignup /> </Route>
          </Switch>
        </div>
      </Router>
    )
}

export default Nav;
