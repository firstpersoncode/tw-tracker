import React, { Component } from 'react';

export default class FormOption extends Component {
  render() {
    return (
      <div class={this.props.className}>
        <form onSubmit={this.props.setOpt}>
          <input type="text" ref="opt-first" placeholder="first option" /><br />
          <input type="text" ref="opt-second" placeholder="second option" /><br />
          <input type="number" ref="opt-limit" placeholder="limit" /><br />
          <input type="submit" />
        </form>
        <button onClick={this.props.stopStream}>STOP</button>
      </div>
    );
  }
}
