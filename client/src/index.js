/*
 *
 * App
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import {
  resetState,
  newTweet,
  firstRate,
  secondRate,
  finishLoading,
  newCoordinate
} from './actions';

// socket
// import io from 'socket.io-client';
import socket from '../socket';

// components
import Map from "./components/Map";
import FormOption from "./components/FormOption";
import Graph from "./components/Graph";
import TweetLoading from "./components/TweetLoading";
import Tweets from "./components/Tweets";
import Tweet from "./components/Tweet";


export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      optFirst: '',
      optSecond: '',
      fullHeight: false,
      hidePanel: false,
    }
    this.setOpt = this.setOpt.bind(this);
    this.stopStream = this.stopStream.bind(this);
    this.classWrap = this.classWrap.bind(this);
  }

  componentWillMount() {
    // stream tweet from server
    socket.on('tweet', (tweet) => {
      this.props.dispatch(newTweet(tweet, () => {
        setTimeout(()=>{
          var element = this.refs.mainT.refs["main-tweet"];
          element.scrollTop = element.scrollHeight;
        }, 500);
      }));
      this.props.dispatch(firstRate(tweet.optFirst));
      this.props.dispatch(secondRate(tweet.optSecond));
    });

    socket.on('tweet coordinates', (coordinate) => {
      // console.log(coordinate);
      this.props.dispatch(newCoordinate(coordinate));
    });
  }

  // set options to compare
  setOpt(e) {
    e.preventDefault();
    var optFirst = this.refs.opt.refs['opt-first'].value.toLowerCase();
    var optSecond = this.refs.opt.refs['opt-second'].value.toLowerCase();
    var optLimit = this.refs.opt.refs['opt-limit'].value.toLowerCase();

    this.setState({
      optFirst,
      optSecond,
    })

    // remove all tweets
    this.props.dispatch(resetState());

    // start new stream in server
    socket.emit('stream', {optFirst, optSecond, optLimit}, (data) => {
      if(data) {
        this.props.dispatch(finishLoading());
      }
    });
  }

  // force stop streaming
  stopStream() {
    socket.emit('end stream');
    this.props.dispatch(finishLoading());
  }

  fullHeight() {
    this.setState({ fullHeight: !this.state.fullHeight })
    this.setState({ hidePanel: false })
  }

  hidePanel() {
    this.setState({ fullHeight: false })
    this.setState({ hidePanel: !this.state.hidePanel })
  }

  classWrap() {
    if (this.state.fullHeight) {
      return "wrapper fullHeight"
    }

    if (this.state.hidePanel) {
      return "wrapper hidePanel"
    }

    return "wrapper"
  }


  render() {
    // map tweet list in array
    const mapTweet = this.props.appState.tweet.map((index, keys) => {
      return (
        <Tweet
          key={keys}
          date={index.date}
          classTag={index.text.toLowerCase().indexOf(this.refs.opt.refs['opt-first'].value) !== -1 ? "opt-first" : "opt-second"}
          profpic={index.profpic}
          user={index.user}
          username={index.username}
          text={index.text}
          hashtags={index.hashtags}
          entities={index.entities} />
      );
    });

    return (
      <div class="main">
        <div class="mapWrapper">
          <Map coordinates={this.props.appState.coordinates} />
        </div>
        <div class={this.classWrap()}>
          <button class="hidePanel" onClick={this.hidePanel.bind(this)}>{this.state.hidePanel ? 'show' : 'hide'}</button>
          <button class="setHeight" onClick={this.fullHeight.bind(this)}>{this.state.fullHeight ? 'half height' : 'full height'}</button>
          <FormOption
            class={this.props.appState.loading ? "wait" : ""}
            ref="opt"
            setOpt={this.setOpt}
            stopStream={this.stopStream} />
          <TweetLoading
            class={this.props.appState.loading ? "wait" : ""}
            tweetLoading={this.props.appState.tweet.length} />
          <Graph
            optFirst={this.state.optFirst}
            optSecond={this.state.optSecond}
            firstPercent={this.props.appState.first}
            secondPercent={this.props.appState.second} />
          <Tweets ref="mainT" mapTweet={mapTweet} />
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    appState: store.appState,
  }
})(App);
