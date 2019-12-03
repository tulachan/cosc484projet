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
              subreadit={post.post_subreadit}
              isLink = {post.post_islink}
              id={post.post_id} />
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
      <div>
        <p> {this.getType(this.props.islink)} <br></br> <br></br> 
        Author: {this.props.author} <br></br>
       Subreadit: {this.props.subreadit} <br></br>
         Likes: {this.state.count} <button onClick={() => {this.handlelikeIncrement()}} > Like </button> <br></br>
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
        return (<button onClick={() => {this.display(this.props.body)}}> {this.props.title} </button>);
      }
    }
  }

export default Sub;