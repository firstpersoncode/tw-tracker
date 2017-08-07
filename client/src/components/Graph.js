import React, { Component } from 'react';

export default class Graph extends Component {
  render() {
    return (
      <div class="graph-container">
        <div class="first" style={{
          "height": Math.floor(this.props.firstPercent)+"%"
        }}>
          {Math.floor(this.props.firstPercent)} % <br />
          <h2>{this.props.optFirst}</h2>
        </div>

        <div class="second" style={{
          "height": Math.floor(this.props.secondPercent)+"%"
        }}>
          {Math.floor(this.props.secondPercent)} % <br />
          <h2>{this.props.optSecond}</h2>
        </div>
      </div>
    );
  }
}
