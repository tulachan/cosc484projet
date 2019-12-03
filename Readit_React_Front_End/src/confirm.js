import React from 'react';
import { Link } from 'react-router-dom';

// This page has a bug that causes it to say login failed, but refreshing the page or clicking retry login confirms you are actually logged in 

class Confirm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            loggedin: false
        };
    }

    async componentDidMount() {
      // Call our fetch function below once the component mounts
    await this.callBackendAPI()
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

  checkLoginStatus()
  {
    if (this.state.loggedin)
    {
      return (
          <div className="login-done">
              <h1> Login Successful! </h1>
              <Link to="/userPage">
                    
                </Link>
          </div>
      )
    }
    else
    {
      return (
          <div className="login-failed">
              <h1> Login Failed. . .</h1>
                <Link to="/login">
                    <button className="signup-butt"> Try Login Again </button>
                </Link>
          </div>
      )
    }
  }
  
    render() {
        
        return(
          this.checkLoginStatus()
        )
    }
}

export default Confirm;