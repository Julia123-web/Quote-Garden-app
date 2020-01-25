import React, { Component } from "react";

export default class Quote extends Component {
  render() {
    return (
      <div>
        <p>{this.props.text}</p>
        <h3>By: {this.props.author}</h3>
        <button className="buttonLike" onClick={this.props.incrementLike}>
          :)
        </button>
        <button className="buttonDislike" onClick={this.props.incrementDislike}>
          :(
        </button>
      </div>
    );
  }
}
