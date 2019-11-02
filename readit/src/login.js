import React, { Component } from 'react';
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
            <div>
                <h1> Login Page</h1>
                <form>
                    <h2> Hello {this.state.username}!</h2>
                    <label> Username </label>
                    <input name type='text' onChange={this.handleChangeUser} />
                    <br></br>
                    <label> Password </label>
                    <input type='password' onChange={this.handleChangePass} />
                    <br></br>
                    <Link to="/home">
                        <button> Login </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default Login;