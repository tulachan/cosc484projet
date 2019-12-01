import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Start from "./Start";
import FrontPage from "./frontpage";
import Search from "./search";
import Confirm from "./confirm";
import CreatePost from "./createpost";
import CreateSub from "./createsub";
import Login from "./login";
import UsersPage from "./UsersPage";
import Signup from "./signup";
import Forgotpage from './forgotpage';
import SuccessfulSignup from './successsfulSignup';
import Sub from './sub';


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
          <Link to="/createPost">
            <button className="login-butt"> Create Post </button>
          </Link>
          <Link to="/createSub">
            <button className="login-butt"> Create SubReadit </button>
          </Link>
          <Link to="/usersPage">
            <button className="login-butt"> Users Page </button>
          </Link>
      </div>
        <div>
          <Switch>
            <Route path="/" exact> <Start /> </Route>
            <Route path="/subreadit/"> <Sub /> </Route>
            <Route path="/login"> <Login /> </Route>
            <Route path="/confirm"> <Confirm /> </Route>
            <Route path="/frontpage"> <FrontPage /> </Route>
            <Route path="/search"> <Search /> </Route>
            <Route path="/UsersPage"> <UsersPage /> </Route>
            <Route path="/signup"> <Signup /> </Route>
            <Route path="/createPost"> <CreatePost /> </Route>
            <Route path="/createSub"> <CreateSub /> </Route>
            <Route path="/successfulSignup"> <SuccessfulSignup /> </Route>
            <Route path="/usersPage"> <UsersPage /> </Route>
            <Route path="/forgotpage"> <Forgotpage/> </Route>
          </Switch>
        </div>
        <div className="social-links">

{/* LinkedIn */}
<a href="https://www.linkedin.com/" rel="noopener noreferrer" target="_blank">
  <i className="fa fa-linkedin-square" aria-hidden="true" />
</a>

{/* Github */}
<a href="https://github.com/tulachan/cosc484projet" rel="noopener noreferrer" target="_blank">
  <i className="fa fa-github-square" aria-hidden="true" />
</a>

{/* Youtube */}
<a href="https://www.youtube.com/" rel="noopener noreferrer" target="_blank">
  <i className="fa fa-youtube-square" aria-hidden="true" />
</a>

</div>
      </Router>
     
    )
}

export default Nav;
