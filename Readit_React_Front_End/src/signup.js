import React, { Component } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

class Signup extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            id: "",
            username: "",
            password: "",
            email: ""
        };
    }

    handleChangeId = (event) => {
        this.setState({id: event.target.value});
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

    render() {
        return(
            <div className="signup-textbox">
                <h2 className="signup-title"> Sign-up Page</h2>
                <form className="signup-form" onSubmit={this.onSubmit}>
                    <label className="signup"> Enter ID:  </label>
                    <input type='text' onChange={this.handleChangeId} />
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
                        <button className="register"> Register </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default Signup;