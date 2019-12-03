import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { is } from '@babel/types';

// This page dynamically loads the top posts from the database

// This is an example of the array returned by the database:
// example: [{post_likes: 0, post_id: 42, post_body: "this is the body", post_title: "Title", post_author: "React", post_creationdate: "date", post_subreadit: "dev"}]
class FrontPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            like_range: 0, // database returns >= to this number
            array: [], // componentDidMount will grab the array from the database and update this as an array of JSON
            
          };
    }

    async componentDidMount() {
        // Call our fetch function below once the component mounts
      await this.callBackendAPI()
        .then(res => this.setState({ array: res }))
        .catch(err => console.log(err));
      }

      callBackendAPI = async () => {
        const response = await fetch('/api/topposts' , {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(this.state)
          });
        const body = await response.json();
  
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
      };

      _getPages() {    
        return this.state.array.map((post) => { 
          return (
            <TopPosts 
              author={post.post_author} 
              body={post.post_body} 
              likes={post.post_likes}
              title={post.post_title}
              date={post.post_creationdate}
              subreadit={post.post_subreadit}
              islink={post.post_islink}
              id={post.post_id} />
          ); 
        });
      }

      
    // need to dynamically render frontpage based on array of top posts from database
    // need api endpoint to service this
    render () {
      const pages = this._getPages();
      let PageNodes = <div>{pages}</div>;
      
      return(
        <div>
          {PageNodes}
        </div>  
      );
  }
}

class TopPosts extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = {
          count: 0, 
          updated: false,
          author: "",
          likess: "",
          id: "",
          loggedin: false,
          
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
handleChangeUser = (event) => {
  this.setState({id: event.props.array.id});
}
handleChangeAuthor = (event) => {
  this.setState({id: event.props.array.author});
}
handlelikeIncrement= (event) =>
{
  if(!this.state.updated && this.state.loggedin)
  {
    let newCount = this.state.count + 1
    this.setState({count: newCount});
    //this.updateDatabase();
    this.setState({updated: true});
  }
  else
  {
        alert("Must log in to like or you can't like it again");
          
  }
 
}

  render () {
    return(
      <div>
          <p> {this.getType(this.props.islink)}  Author: {this.props.author} 
         _Sub: {this.props.subreadit} Likes: {this.props.likes} Created: {this.props.date}

         </p> 
         Likes: {this.state.count}<br></br>
         <button onClick={this.handlelikeIncrement}>Like</button>
        </div>
    );
  }
  //sending data
  updateDatabase()
    {
    
      if(this.state.loggedin)
      {
        
        fetch('/api/upvotepost', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
            })
            .then((result) => result.json())
            .then((info) => { console.log(info); })
    }
    else{
      return(
        <div>
            <h1> You must be logged in to Like! </h1>
            

        </div>
      )

    }
  }

  display(body)
  {
    alert(body);
  }

  getType(islink)
    {
      if (islink)
      {
        return (<a href={this.props.body}> {this.props.title} </a>)
      }
      else
      {
        return (<button onClick={() => {this.display(this.props.body)}}> {this.props.title} </button>);
      }
    }
}

export default FrontPage;