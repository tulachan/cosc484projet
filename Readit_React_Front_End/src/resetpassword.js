import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class RestPassword extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: "",
            email: "",
            password:"",
            vpassword:""
        };
    }
    handleChangeUser = (event) => {
        this.setState({username: event.target.value});
    }
    handleChangeEmail = (event) => {
            this.setState({email: event.target.value});
        }
        handleChangePass = (event) => {
            this.setState({password: event.target.value});
        }
        handleChangeVerifyPass = (event) => {
            this.setState({vpassword: event.target.value});
        }
        componentDidMount() {
            // Call our fetch function below once the component mounts
          this.callBackendAPI()
            .then(res => this.setState({ loggedin: res.loggedin }))
            .catch(err => console.log(err));
        }
          // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js)
        callBackendAPI = async () => {
          const response = await fetch('/api/loggedin');
          const body = await response.json();
      
          if (response.status !== 200) {
            throw Error(body.message) 
          }
          console.log(body);
          return body;
        };

        passwordsMatch = () => {
            if(this.state.vpassword !== this.state.password)
            {
                alert("Password doesnt match and please fix password before move on");
                return false; 
            }
            else
            {
                return true;
            }
        }
        handleSubmit= (event)=>{
            if(!this.passwordsMatch())
            {
                event.preventDefault();
                return;
            }
            const {username,password,vpassword,email}= this.state;
        };



        isLoggedIn()
        {
            
            if (this.state.loggedin)
            {
                return(
                    <div>
                        <h1> You are already logged in!</h1>
                    </div>
                )
            }
            else
            {
                return(
                    
                    <div>
                    <form className="forgot-form">
                    <h3 className="forgot-title"><i>PLease Enter the Email Address </i></h3>
                    <label>USerName </label>
                    <form>
                    <input type='text' value={this.state.username} onChange={this.handleChangeUser} />
                        <br/><br/>
                        <label>Email Address </label>
                    <input type='text' value={this.state.email} onChange={this.handleChangeEmail} />
                        <br/><br/>
                        <label className="signup"> Set Password:  </label>
                    <input type='password' value={this.state.password} onChange={this.handleChangePass} />
                    <br/><br/>
                    <label className="signup"> Re-Enter Password:  </label>
                    <input type='password' value={this.state.vpassword} onChange={this.handleChangeVerifyPass} onBlur={this.passwordsMatch}/>
                    <br/><br/>
    
                        <Link to="/">
                        <button disabled= {!this.passwordsMatch} onClick={() => {this.checkDatabase()}}> Submit </button>
                        </Link>
    
                    </form>
                    </form>
                </div>
                )
            }
        }
        checkDatabase()
        {
            
            fetch('/api/forgot' , {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.state)
                })
                .then((result) => result.json())
                .then((info) => { console.log(info); });
                
        }
    


        render() {
            return(
                this.isLoggedIn()
            )
        }
}


export default RestPassword;