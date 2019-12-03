import React from 'react';
import { Link } from 'react-router-dom';

class Start extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            loggedin: false
        };
    }

    componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ loggedin: res.loggedin }))
      .catch(err => console.log(err));
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js)
    callBackendAPI = async () => {
      const response = await fetch('/api/isloggedin');
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };

  logout()
  {
    if (this.state.loggedin)
    {
      this.callLogout();
      alert("Thank you for using Readit!");
      window.location.reload(true);
    }
    else
    {
      alert("You are already logged out!");
    }
  }

  callLogout()
    {
        fetch('/api/logout' , {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
            })
            .then((result) => result.json())
            .then((info) => { console.log(info); });
    }

    render() {
        return(
          <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Readit</h1>
            <hr/>
            </header>  
          <div className="start-butt">
            <Link to="/login">
                <button className="signup-butt"> Login </button>
            </Link>

            <Link to="/signup">
              <button className="signup-butt"> Signup </button>
            </Link>

            <Link>
              <button className="signup-butt" onClick={() => {this.logout()}}> Sign Out </button>
            </Link> 

            <hr/>
            <h4>Related Websites</h4>  
          </div>   
        </div>
        )
    }
}

export default Start;