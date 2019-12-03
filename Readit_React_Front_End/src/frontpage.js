import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './frontpage.css';

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

            <div>
            <h4 className='frontpage'>

            <TopPosts 
              author={post.post_author} 
              body={post.post_body} 
              likes={post.post_likes}
              title={post.post_title}
              date={post.post_creationdate}
              subreadit={post.post_subreadit}
              islink={post.post_islink}
              id={post.post_id} />

                    
             </h4>
              </div>
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
      count: this.props.likes,
      updated: false,
      post_id: this.props.id
    };
  }

  handlelikeIncrement= () =>
  {
      if (!this.state.updated)
      {
          let newCount = this.state.count + 1;
          this.setState({count: newCount});
          this.setState({updated: true});
          this.updateDatabase();
      }
      else{
          alert("You can only like once per post");
      }
  }


  render () {
    return(
<div className='frontpage2'>
<p> {this.getType(this.props.islink)} <br></br> <br></br> 
Author: {this.props.author} <br></br>
Subreadit: {this.props.subreadit} <br></br>
 Likes: {this.state.count} <button className='display' onClick={() => {this.handlelikeIncrement()}} > Like </button> <br></br>
Created: {this.props.date}
</p> 
</div>
    );
  }

  display(body)
  {
    alert(body);
  }

  updateDatabase()
  {
      fetch('/api/upvotepost' , {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(this.state)
          })
          .then((result) => result.json())
          .then((info) => { console.log(info); });
}

  getType(islink)
    {
      if (islink)
      {
        return (<a href={this.props.body}> {this.props.title} </a>)
      }
      else
      {
        return (<button  className='display' onClick={() => {this.display(this.props.body)}}> {this.props.title} </button>);
      }
    }
}

export default FrontPage;