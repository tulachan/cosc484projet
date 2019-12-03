import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class SuccessfulSignup extends React.Component
{
    render() {
        return(
            <div>
                <form className="succ-form">
                <h3 className="succ-title"><i>You are successfully registered. Please return to login page by clicking below: </i></h3>
                    <Link className="retuen" to="/login">
                        <button> Return to log-in </button>
                    </Link>
                    <br></br>
                </form>
            </div>
        )
    }
}

export default SuccessfulSignup;