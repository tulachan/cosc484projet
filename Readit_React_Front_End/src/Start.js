import React from 'react';
import { Link } from 'react-router-dom';

function Start()
{
    const al = () => {
        alert("have a text box on this page that when submitted sends a query to the backend endpoint /new");
    }

    return(
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Readit</h1>
          </header>
          <Link to="/login">
              <button className="login-butt"> Login </button>
          </Link>
          <Link to="/create">
             <button className="create-butt" onClick={al}> Create Sub-Readit </button>
          </Link>
          <Link to="/signup">
            <button className="signup-butt"> Signup </button>
          </Link>
        </div>
    );
}

export default Start;