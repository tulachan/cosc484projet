import React, { Component } from 'react';
import Login from
'./login';

import { Link } from 'react-router-dom';

class UsersPage extends React.Component
{
constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <h2> Hello {this.props.username}!</h2>
         <label>
          Upload file:</label>
          <input type="file" ref={this.fileInput} />
        <label> UpdateStatus </label>
        <input name type='text' onChange={this.handleChangeUser} />
        <br></br>
        <Link to="/home">
        <button type="submit">Submit</button>
        </Link>
        </form>
    );
  }
}
 

export default UsersPage;
