import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            username: "",
            password: ""
        };
    }
    handleChangeUser = (event) => {
        this.setState({username: event.target.value});
    }
    handleChangePass = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return(
            <div className="login-textbox">
                <h1 className="login-title"> Login Page</h1>
                <form className="login-form">
                    <h2 className="hello"> Hello {this.state.username}!</h2>
                    <label className="username"> Username </label>
                    <input name type='text' onChange={this.handleChangeUser} />
                    <br></br>
                    <label className="pass"> Password </label>
                    <input type='password' onChange={this.handleChangePass} />
                    <br></br>
                    <Link to="/UsersPage">
                        <button> Login </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default Login;
