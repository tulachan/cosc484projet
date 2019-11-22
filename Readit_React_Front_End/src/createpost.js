import React, { Component } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

// This doesn't work yet, It should be working for username ta, but it isn't...
// This does is not inserting into the database for some reason
// grab username from whoami endpoint
// send completed data to /api/newpost

class CreatePost extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: "ta",
            postbody: "", 
            posttitle: "",
            postsubreadit: "",
            loggedin: false
        };
    }
    handleChangeBody = (event) => {
        this.setState({postbody: event.target.value});
    }
    handleChangeTitle = (event) => {
        this.setState({posttitle: event.target.value});
    }
    handleChangeSub = (event) => {
        this.setState({postsubreadit: event.target.value});
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
                <h2 className="signup-title"> Create post</h2>
                <form className="signup-form" onSubmit={this.onSubmit}>
                    <label className="signup"> Post Title:  </label>
                    <input type='text' onChange={this.handleChangeTitle} />
                    <br/><br/>
                    <label className="signup"> SubReadit:  </label>
                    <input type='text' onChange={this.handleChangeSub} />
                    <br/><br/>
                    <label className="signup"> Post Body:  </label>
                    <textarea onChange={this.handleChangeBody} />
                    <br/><br/>
                    <p> Hello {this.state.username}! This post is called: {this.state.posttitle} . . . You are posting to: {this.state.postsubreadit} . . . You are posting: {this.state.postbody} </p>
                    <Link to="/frontpage">
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
                <div>
                    <h1> You must be logged in to post! </h1>
                </div>
            )
        }
    }

    updateDatabase()
    {
        fetch('/api/newpost', {
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

export default CreatePost;