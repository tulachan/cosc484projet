import React, { Component } from 'react';
import './userpage.css';


import { Link } from 'react-router-dom';

class UsersPage extends React.Component
{
constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        {id: 1, author: "COSC484", body: "This is working"}

      ]
    };
  }

    // ToggleClick = () => {
    //   this.setState({ show: !this.state.show });
    // }

  render () {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show Status';

    if (this.state.showComments) {
      buttonText = 'Hide Status';
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    return(
      <div className="comment-box">
        <h2>Post the Status!</h2>
        <CommentForm addComment={this._addComment.bind(this)}/>
        <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>
        <h3>Status</h3>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        {commentNodes}


      </div>
    );
  } // end render

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment
          author={comment.author}
          body={comment.body}
          key={comment.id} />
      );
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No Status yet';
    } else if (commentCount === 1) {
      return "1 Status";
    } else {
      return `${commentCount} Status`;
    }
  }
} // end CommentBox component

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          <input placeholder="Name" required ref={(input) => this._author = input}></input><br />
          <textarea placeholder="Comment" rows="6" cols='30' required ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">Post Status </button>
        </div>
      </form>
    );
  } // end render

  _handleSubmit(event) {
    event.preventDefault();   // prevents page from reloading on submit
    let author = this._author;
    let body = this._body;
    this.props.addComment(author.value, body.value);
  }
} // end CommentForm component

class Comment extends React.Component {
  constructor() {
      super();

      this.state = {
        clicks: 0,
       show: true
     };
   }


  IncrementItem = () => {
      this.setState({ clicks: this.state.clicks + 1 });
    }
    DecreaseItem = () => {
      this.setState({ clicks: this.state.clicks - 1 });
    }
  render () {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">- {this.props.body}</p>
        <div className="comment-footer">
        <button href="#" className="comment-footer-delete" onClick={this.IncrementItem}>like</button>
          <button href="#" className="comment-footer-delete" onClick={this.DecreaseItem}>unlike</button>

          { this.state.show ? <h2>{ this.state.clicks }</h2> : '' }
        </div>
      </div>
    );
  }

//  _Likes(commentCount) {
  //  if (commentCount === 0) {
//      return 'No Status yet';
//    } else if (commentCount === 1) {
//      return "1 Status";
//    } else {
//      return `${commentCount} Status`;
//    }
//  }
};

export default UsersPage;
