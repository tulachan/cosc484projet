import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FrontPage extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    // need to dynamically render frontpage based on array of top posts from database
    // need api endpoint to service this
    render() {
        return(
            <div className="frontpage">
                <h1> render array here </h1>
            </div>
        )
    }
}

export default FrontPage;