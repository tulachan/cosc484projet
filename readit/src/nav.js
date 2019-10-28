import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Start from "./Start";
import Login from "./login";

function Nav()
{

    return(
      <Router>
        <div>
          <Switch>
            <Route path="/" exact> <Start /> </Route>
            <Route path="/login"> <Login /> </Route>
          </Switch>
        </div>
      </Router>
    )
}

export default Nav;