import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

// class handles the login page, login reroutes to a confirmation page that displays good login or failed login
// confirmation page will reroute to login to try again

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            username: "",
            password: "",
            loggedin: false
        };
    }
    handleChangeUser = (event) => {
        this.setState({username: event.target.value});
    }
    handleChangePass = (event) => {
        this.setState({password: event.target.value});
    }
    

    componentDidMount() {
        // Call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => this.setState({ loggedin: res.loggedin }))
        .catch(err => console.log(err));
    }
      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js)
    callBackendAPI = async () => {
      const response = await fetch('/api/isloggedin');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };

    isLoggedIn()
    {
        if (this.state.loggedin)
        {
            return(
                <div>
                    <h1> You are already logged in!</h1>
                </div>
            )
        }
        else
        {
            return(
            <div className="login-textbox">
                <h1 className="login-title"> Login Page {this.state.data} </h1>
                <form className="login-form">
                    <h2 className="hello"> Hello {this.state.username}!</h2>
                    <label className="username"> Username </label>
                    <input name type='text' onChange={this.handleChangeUser} />
                    <br></br>
                    <label className="pass"> Password </label>
                    <input type='password' onChange={this.handleChangePass} />
                    <br></br>
                    <Link to="/confirm">
                        <button onClick={() => {this.updateDatabase()}}> Login </button>
                    </Link>
                </form>
            </div>
            )
        }
    }

    updateDatabase()
    {
        fetch('/api/auth' , {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
            })
            .then((result) => result.json())
            .then((info) => { console.log(info); })
    }

    render() {
        return(
            this.isLoggedIn()
        )
    }
}

export default Login;
