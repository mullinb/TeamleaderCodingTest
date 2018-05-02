import React, { Component } from 'react';

class ErrorHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: ''
    }
  }

  render() {
    if (this.state.errorMessage) {
      return (<div>{this.state.errorMessage}</div>)
    }
    return null;
  }
}

export default ErrorHandler;
