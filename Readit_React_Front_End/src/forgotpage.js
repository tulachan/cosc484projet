import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './forgotpage.css';

function validate(username, newpassword, vnewpassword, answer)
{
    return{
        
        username: username.length===0,
        newpassword: newpassword.length===0,
        vnewpassword: vnewpassword.length===0,
        answer: answer.length===0
    };
}

class Forgotpage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: "",
            answer: "",
            newpassword: "",
            vnewpassword: ""
        };
    }
    handleChangeUser = (event) => {
        this.setState({username: event.target.value});
    }
    handleChangeAnswer = (event) => {
            this.setState({answer: event.target.value});
        }
    handleChangeNewpassword = (event) => {
            this.setState({newpassword: event.target.value});
        }
    handleChangeVNewpassword = (event) => {
            this.setState({vnewpassword: event.target.value});
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

    handleSubmit= (event)=>{
        if(!this.canBeSubmitted())
        {
            event.preventDefault();
            return;
        }
        const {username,newpassword,vnewpassword,answer}= this.state;
    };
    canBeSubmitted(){
        const error= validate(this.state.username, this.state.newpassword,this.state.vnewpassword, this.state.answer);
        const isDisabled= Object.keys(error).some(x=> error[x]);  
        return !isDisabled;
        
    }
        passwordsMatch = () => {
            if(this.state.vnewpassword !== this.state.newpassword)
            {
                alert("Password doesnt match and please fix password before move on");
                return false; 
            }
            else
            {
                return true;
            }
        }



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
                const error= validate(this.state.username, this.state.newpassword,this.state.vnewpassword, this.state.answer);
                const isDisabled= Object.keys(error).some(x=> error[x]);   
                return(
                    
                    <div>
                    <form className="forgot-form">
                    <h3 className="forgot-title"><i>Please Enter the Account Information </i></h3>
                    <br/><br/>
                    
                    <label className='forgotText'> UserName </label>
              
                    <input type='text'  value={this.state.username} onChange={this.handleChangeUser} />
                    <form className='forgot-form2'>
                        <br/><br/>
                        <label className="forgotPass"> Set Password:  </label>
                    <input type='password' value={this.state.newpassword} onChange={this.handleChangeNewpassword} />
                    <br/><br/>
                    <label className="forgotPass"> Re-Enter Password:  </label>
                    <input type='password' value={this.state.vnewpassword} onChange={this.handleChangeVNewpassword} onBlur={this.passwordsMatch}/>
                    <br/><br/>

                    <label className='security'> Security Question</label> 
                    
                    
                    <select value={this.state.securityquestion} onChange= {this.handleChangeQuestion}>
                    <option>Choose a Question</option>
                    <option value="What is your first pet name?">What is your first pet name?</option>
                    <option value="What is make of your first car?">What is make of your first car?</option>
                    <br></br>
                    </select>
                    <br/><br/>
                    <br></br>
                    <label className='Answer'>Answer: </label>
                    <input type='text' value={this.state.email} onChange={this.handleChangeAnswer} />
                    <br/><br/>
                   
    
                        <Link to="/">
                        <button  disabled= {!this.passwordsMatch || isDisabled} onClick={() => {this.checkDatabase()}}> Submit </button>
                        </Link>
                       
    
                    </form>
                    </form>
                </div>
                )
            }
        }
        checkDatabase()
        {
            
            fetch('/api/resetpassword' , {
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


export default Forgotpage;