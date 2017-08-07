import React, { Component } from 'react';

export default class Tweets extends Component {
  render() {
    return (
      <div ref="main-tweet" class="tweet-container">
        <ul class="tweet-list">
          {this.props.mapTweet}
        </ul>
      </div>
    );
  }
}
