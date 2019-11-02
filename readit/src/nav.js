import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Start from "./Start";
import Login from "./login";
import Signup from "./signup";
import SuccessfulSignup from './successsfulSignup';

function Nav()
{

    return(
      <Router>
        <div>
          <Switch>
            <Route path="/" exact> <Start /> </Route>
            <Route path="/login"> <Login /> </Route>
            <Route path="/signup"> <Signup /> </Route>
            <Route path="/successfulSignup"> <SuccessfulSignup /> </Route>
          </Switch>
        </div>
      </Router>
    )
}

export default Nav;