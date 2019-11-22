import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// you can paste: { this.state.array } into the <div> tag for return to see then names of the array headers when it throws the error

class FrontPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            array: null // componentDidMount will grab the array from the database and update this as an array of JSON
        };
    }

    async componentDidMount() {
        // Call our fetch function below once the component mounts
      await this.callBackendAPI()
        .then(res => this.setState({ array: res }))
        .catch(err => console.log(err));
      }
      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js)
      callBackendAPI = async () => {
        const response = await fetch('/api/topposts');
        const body = await response.json();
  
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
      };
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