import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
              subreadit={post.post_subreadit} />
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
  render () {
    return(
      <div className="frontpage">
        <p className="frontpage-line">{this.props.title} Author: {this.props.author} 
         _Sub: {this.props.subreadit} Likes: {this.props.likes} Created: {this.props.date}
         _Button here to view content: {this.props.body} </p>
      </div>
    );
  }
}

export default FrontPage;