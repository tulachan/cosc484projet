import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SuccessfulSignup extends React.Component
{
    render() {
        return(
            <div>
                <form>
                <h3><i>You are successfully registered. Please return to login page by clicking below: </i></h3>
                    <Link to="/login">
                        <button> Return to log-in </button>
                    </Link>
                    <br></br>
                </form>
            </div>
        )
    }
}

export default SuccessfulSignup;