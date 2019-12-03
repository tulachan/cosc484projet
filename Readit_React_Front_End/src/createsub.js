import React, { Component } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';


// grab username from whoami endpoint
// eventually, make sure user is a moderator
// send the user to the newly created subreadit (URL should match the name of the subreadit)

class CreateSub extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            subreaditname: "",
            link: "",
            loggedin: false
        };
    }
    handleChangeSub = (event) => {
        let newlink = "subreadit/" + event.target.value;
        this.setState({subreaditname: event.target.value});
        this.setState({link: newlink});
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

    isLoggedIn()
    {
        if (this.state.loggedin)
        {
            return(
                <div className="signup-textbox">
                <h2 className="signup-title"> Create SubReadit</h2>
                <form className="signup-form" onSubmit={this.onSubmit}>
                    <label className="signup"> SubReadit Name:  </label>
                    <input type='text' onChange={this.handleChangeSub} />
                    <br/><br/>
                    <p> Hello {this.state.username}! This subReadit is called: {this.state.subreaditname}</p>
                    <Link to= {this.state.link}>
                        <button className="register" onClick={() => {this.updateDatabase()}}> Create </button>
                    </Link>
                    <br></br>
                </form>
            </div>
            )
        }
        else
        {
            return(
                <div className="create-sub-error">
                    <h1> You must be a moderator to create subReadits! </h1>
                </div>
            )
        }
    }

    updateDatabase()
    {
        fetch('/api/newsubreadit', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
            })
            .then((result) => result.json())
            .then((info) => { console.log(info); })
    }

    render() {
        return(
            this.isLoggedIn()
        )
    }
}

export default CreateSub;