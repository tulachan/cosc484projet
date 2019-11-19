import React, { Component } from 'react';
import './userpage.css';
import Login from
'./login';

import { Link } from 'react-router-dom';

class UsersPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            status: "",
            username:""

        };
    }
    handleChangeUser = (event) => {
        this.setState({status: event.target.value});
      }
      handleChangeUser = (event) => {
          this.setState({username: event.Login.value});
    }
    //handleChangePass = (event) => {
      //  this.setState({password: event.target.value});
    //}

    render() {
        return(
            <div className="user-textbox">
                <h1 className="user-title"> Users Page</h1>
                <form className="user-form">
                    <h2 className="user-hello"> Hello {this.props.username}!</h2>
                    <label className="user-status"> UpdateStatus </label>
                    <input name type='text' onChange={this.handleChangeUser} />
                    <br></br>
                    <br></br>
                    <Link to="/home">
                        <button className="post"> Post </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default UsersPage;

