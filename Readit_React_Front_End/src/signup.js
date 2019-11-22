import React, { Component } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

// signup needs to be coded to require all fields before submitting to database, otherwise the database will not create an entry and the user will not be able to login

class Signup extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            firstname: "",
            lastname: "", 
            username: "",
            password: "",
            email: "",
            loggedin: false
        };
    }
    handleChangeFirst = (event) => {
        this.setState({firstname: event.target.value});
    }
    handleChangeLast = (event) => {
        this.setState({lastname: event.target.value});
    }
    handleChangeUser = (event) => {
        this.setState({username: event.target.value});
    }
    handleChangePass = (event) => {
        this.setState({password: event.target.value});
    }
    handleChangeEmail = (event) => {
        this.setState({email: event.target.value});
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
            <div className="signup-textbox">
                <h2 className="signup-title"> Sign-up Page</h2>
                <form className="signup-form" onSubmit={this.onSubmit}>
                    <label className="signup"> First Name:  </label>
                    <input type='text' onChange={this.handleChangeFirst} />
                    <br/><br/>
                    <label className="signup"> Last Name:  </label>
                    <input type='text' onChange={this.handleChangeLast} />
                    <br/><br/>
                    <label className="signup"> Please enter a desired username:  </label>
                    <input type='text' onChange={this.handleChangeUser} />
                    <br/><br/>
                    <label className="signup"> Set Password:  </label>
                    <input type='password' onChange={this.handleChangePass} />
                    <br/><br/>
                    <label className="signup"> Enter Email address:  </label>
                    <input type='text' onChange={this.handleChangeEmail} />
                    <br/><br/>
                    <Link to="/successfulSignup">
                        <button className="register" onClick={() => {this.updateDatabase()}}> Register </button>
                    </Link>
                    <br></br>
                </form>
            </div>
            )
        }
    }

    updateDatabase()
    {
        fetch('/api/registernewuser' , {
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

export default Signup;