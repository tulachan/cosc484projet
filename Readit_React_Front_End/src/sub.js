import React, { Component } from 'react';

class Sub extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            subreadit_name: this.getName(),
            array: []
        };
    }

    async componentDidMount() {
        // Call our fetch function below once the component mounts
      await this.callBackendAPI()
        .then(res => this.setState({ array: res }))
        .catch(err => console.log(err));
      }

      callBackendAPI = async () => {
        const response = await fetch('/api/displaysubreadit' , {
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

    getName()
    {
        let loc = window.location.href;
        let arr = loc.split("/");
        let name;
        for (let i=0; i < arr.length; i++)
        {
            if (arr[i] == "subreadit")
            {
                if (i+1 < arr.length)
                {
                    name = arr[i+1];
                    break;
                }
                else
                {
                    name = "NO_SUB_NAME";
                    break;
                }
            }
        }
        return name;
    }

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

    // If the subreadit doesn't exist and the person using the browser is a user, then we need to ask if they want to create that subreadit
    render() {
        const pages = this._getPages();
        let PageNodes = <div>{pages}</div>;
        return(
            <div>
            <h1> { this.state.subreadit_name } </h1>
                {PageNodes}
            </div>
        )
    }
}

class TopPosts extends React.Component {
    render () {
      return(
        <div>
          <p> <button onClick={() => {this.display(this.props.body)}}> {this.props.title} </button> Author: {this.props.author} 
         _Sub: {this.props.subreadit} Likes: {this.props.likes} Created: {this.props.date}
         </p> 
        </div>
      );
    }

    display(body)
  {
    alert(body);
  }
  }

export default Sub;