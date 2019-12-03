import React, { Component } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

// signup needs to be coded to require all fields before submitting to database, otherwise the database will not create an entry and the user will not be able to login
function validate(firstname, lastname, username, password, vpassword, email, securityanswer)
{
    return{
        
        firstname: firstname.length===0,
        lastname: lastname.length===0,
        username: username.length===0,
        password: password.length===0,
        vpassword: vpassword.length===0,
        securityanswer: securityanswer.length===0,
        email: email.length=== 0
    };
}



class Signup extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            firstname: "",
            lastname: "", 
            username: "",
            password: "",
            vpassword: "",
            email: "",
            securityquestion: "",
            securityanswer: "",
            loggedin: false,

            everFocusedFirstname: false,
            everFocusedLastname: false,
            everFocusedUsername: false,
            everFocusedPassword: false,
            everFocusedvPassword: false,
            everFocusedAnswer: false,
            everFocusedEmail: false
           
        };
    }
    handleChangeFirst = (event) => {
        this.setState({firstname: event.target.value});
    }
    handleChangeLast = (event) => {
        this.setState({lastname: event.target.value});
    }
    handleChangeUser = (event) => {
        this.setState({username: event.target.value});
    }
    handleChangePass = (event) => {
        this.setState({password: event.target.value});
    }
    handleChangeVerifyPass = (event) => {
        this.setState({vpassword: event.target.value});
    }
    handleChangeEmail = (event) => {
        this.setState({email: event.target.value});
    }
    handleChangeQuestion = (event) => {
        this.setState({securityquestion: event.target.value});
    }
    handleChangeAnswer = (event) => {
        this.setState({securityanswer: event.target.value});
    }


    handleSubmit= (event)=>{
        if(!this.canBeSubmitted())
        {
            event.preventDefault();
            return;
        }
        const {firstname,lastname, username,password,vpassword,email, securityanswer}= this.state;
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

    canBeSubmitted(){
        const error= validate(this.state.firstname, this.state.lastname, this.state.username, this.state.password, this.state.vpassword,this.state.email, this.state.securityanswer);
        const isDisabled= Object.keys(error).some(x=> error[x]);  
        return !isDisabled;
        
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
                <div>
                    <h1> You are already logged in</h1>
                </div>
            )
        }
        else
        {  const error= validate(this.state.firstname, this.state.lastname, this.state.username, this.state.password, this.state.vpassword,this.state.email,this.state.securityanswer);
            const isDisabled= Object.keys(error).some(x=> error[x]); 
            return(
            <div className="signup-textbox">
                <h2 className="signup-title"> Sign-up Page</h2>
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <label className="signup"> First Name:  </label>
                    <input type='text' value={this.state.firstname} onChange={this.handleChangeFirst} />
                    <br/><br/>
                    <label className="signup"> Last Name:  </label>
                    <input type='text' value={this.state.lastname} onChange={this.handleChangeLast} />
                    <br/><br/>
                    <label className="signup"> Username:  </label>
                    <input type='text' value={this.state.username}  onChange={this.handleChangeUser} />
                    <br/><br/>
                    <label className="signup"> Set Password:  </label>
                    <input type='password' value={this.state.password} onChange={this.handleChangePass} />
                    <br/><br/>
                    <label className="signup"> Re-Enter Password:  </label>
                    <input type='password' value={this.state.vpassword} onChange={this.handleChangeVerifyPass} onBlur={this.passwordsMatch}/>
                    <br/><br/>
                    <label className="signup"> Email address:  </label>
                    <input type='text' value={this.state.email} disabled= {!this.passwordsMatch} onChange={this.handleChangeEmail} />
                    <br/><br/>
                    <br/><br/>
                    <label className="secu-ques"> Choose a Security Question  </label>
                    <br></br>
                    <br></br>
                    Questions <select value={this.state.securityquestion} onChange= {this.handleChangeQuestion}>
                    <option>Choose a Question</option>
                    <option value="What is your first pet name?">What is your first pet name?</option>
                    <option value="What is make of your first car?">What is make of your first car?</option>
                    <br></br>
                    </select>
                    <br></br>
                    <label className="signup"> Answer:  </label>
                    <input type='text' value={this.state.securityanswer} onChange={this.handleChangeAnswer} />
                    <br></br>
                    <Link to="/successfulSignup">
                        <button className="register" disabled= {isDisabled} onClick={() => {this.updateDatabase()}}> Register </button>
                    </Link>
                    <br></br>
                </form>
            </div>
            )
        }
    }

    updateDatabase()
    {
        fetch('/api/registernewuser' , {
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

export default Signup;