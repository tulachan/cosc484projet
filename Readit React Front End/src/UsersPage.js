import React, { Component } from 'react';
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
          this.setState({username: event.target.value});
    }
    //handleChangePass = (event) => {
      //  this.setState({password: event.target.value});
    //}

    render() {
        return(
            <div>
                <h1> Users Page</h1>
                <form>
                    <h2> Hello {this.props.username}!</h2>
                    <label> UpdateStatus </label>
                    <input name type='text' onChange={this.handleChangeUser} />
                    <br></br>
                    <br></br>
                    <Link to="/home">
                        <button> Post </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default UsersPage;

