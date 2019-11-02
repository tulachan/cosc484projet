import React, { Component } from 'react';
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
            <div>
                <h2> Sign-up Page</h2>
                <form onSubmit={this.onSubmit}>
                    <label> Enter ID:  </label>
                    <input type='text' onChange={this.handleChangeId} />
                    <br/><br/>
                    <label> Please enter a desired username:  </label>
                    <input type='text' onChange={this.handleChangeUser} />
                    <br/><br/>
                    <label> Set Password:  </label>
                    <input type='password' onChange={this.handleChangePass} />
                    <br/><br/>
                    <label> Enter Email address:  </label>
                    <input type='text' onChange={this.handleChangeEmail} />
                    <br/><br/>
                    <Link to="/successfulSignup">
                        <button> Register </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default Signup;