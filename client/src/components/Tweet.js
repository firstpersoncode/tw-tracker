import React, { Component } from 'react';

export default class Tweet extends Component {
  render() {

    const convertHashTags = (str, hash) => {

      // split text become array
      const tweetToArr = str.split(" ");
      let result;

      // map hashtags array, add anchor tag for every hashtag
      if (hash.length) {
        let res = tweetToArr;
        const mappedHashTag = hash.map((index) => {

          let hasHash = '#'+index.text; // target hasHash in array
          let queryHash = tweetToArr.indexOf(hasHash);
          let templateHash = `<a href=${"http://twitter.com/"+hasHash} target="_blank">${hasHash}</a>`;

          if (queryHash !== -1) {
            res[queryHash] = templateHash;
          }

          return res;
        });

        result = mappedHashTag[mappedHashTag.length - 1].join(" ");
      } else {
        result = tweetToArr.join(" ");
      }
      return result;
    }

    const processMedia = (arr) => {
      if (!arr.length) return false;

      switch (arr) {
        case this.props.entities.media: {
          return arr.map((media, i) => {
            return (
              <img src={media.media_url_https} alt="media" key={i} />
            )
          });
          break;
        }
        case this.props.entities.urls: {
          return arr.map((media, i) => {
            return (
              <a href={media.expanded_url} key={i} target="_blank">{media.expanded_url}</a>
            )
          })
          break;
        }
      }
    }

    const mappedHash = this.props.hashtags.length ? this.props.hashtags.map((hash, i) => {
      return (
        <a style={{ 'margin-right': '10px' }} href={"https://twitter.com/#"+hash.text} target="_blank" key={i}>#{hash.text}</a>
      );
    }) : 'no hashtags';

    return (
      <li class={this.props.classTag}>
        <div class="header">
          <img src={this.props.profpic} alt={this.props.user} />
          <div class="name">{this.props.user}</div>
          <div class="username">as <a href={"http://twitter.com/"+this.props.username} target="_blank">{this.props.username}</a></div>
        </div>
        {this.props.entities.media ? processMedia(this.props.entities.media) : null}
        {this.props.entities.urls ? processMedia(this.props.entities.urls) : null}
        <div dangerouslySetInnerHTML={{ __html: convertHashTags(this.props.text, this.props.hashtags) }}></div>
        <div class="hash">
          Hashtags: {mappedHash}
        </div>
        <div>{this.props.date}</div>
      </li>
    );
  }
}
