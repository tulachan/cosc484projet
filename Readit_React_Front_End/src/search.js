import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            query: ""
        };
    }
    handleChangeQuery = (event) => {
        this.setState({query: event.target.value});
    }
    // If the subreadit doesn't exist and the person using the browser is a user, then we need to ask if they want to create that subreadit
    render() {
        return(
            <div className="login-textbox">
                <h1 className="login-title"> Search for subreadit</h1>
                <form className="login-form">
                    <h2 className="hello"> Looking for the subReadit {this.state.query}?</h2>
                    <label className="username"> Search </label>
                    <input name type='text' onChange={this.handleChangeQuery} />
                    <br></br>
                    <Link to={this.state.query}>
                        <button> Search </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default Search;