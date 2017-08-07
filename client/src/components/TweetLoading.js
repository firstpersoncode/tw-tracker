import React, { Component } from 'react';

export default class TweetLoading extends Component {
  render() {
    return (
      <div class={this.props.className}>
        <span style={{position: "fixed"}} class="total-tweets">{this.props.tweetLoading}</span>
      </div>
    );
  }
}
