import React, { Component } from 'react';
import socket from '../../socket';
import { connect } from 'react-redux';

class Map extends Component {
  constructor() {
    super();
    this.mappedMap;
    this.renderMap = this.renderMap.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
  }

  renderMap() {
    const center = new google.maps.LatLng(0, 0);
    const map = new google.maps.Map(this.refs.map, {
      center,
      zoom: 2,
    });
    return map;
  }

  renderMarker(loc, map, info) {
    if (!loc) return;
    const coordInfoWindow = new google.maps.InfoWindow();
    coordInfoWindow.setContent(createInfoWindowContent(loc, map.getZoom()));
    coordInfoWindow.setPosition(loc);
    coordInfoWindow.open(map);

    // map.addListener('zoom_changed', function() {
    //   coordInfoWindow.setContent(createInfoWindowContent(loc, map.getZoom()));
    //   coordInfoWindow.open(map);
    // });

    const TILE_SIZE = 200;

    function createInfoWindowContent(latLng, zoom) {
      const scale = 1 << zoom;

      const worldCoordinate = project(latLng);

      const pixelCoordinate = new google.maps.Point(
          Math.floor(worldCoordinate.x * scale),
          Math.floor(worldCoordinate.y * scale));

      const tileCoordinate = new google.maps.Point(
          Math.floor(worldCoordinate.x * scale / TILE_SIZE),
          Math.floor(worldCoordinate.y * scale / TILE_SIZE));

      return `<div class="wrapper-info">${info.join('<br>')}</div>`;
    }
    function project(latLng) {
      let siny = Math.sin(latLng.lat() * Math.PI / 180);

      // Truncating to 0.9999 effectively limits latitude to 89.189. This is
      // about a third of a tile past the edge of the world tile.
      siny = Math.min(Math.max(siny, -0.9999), 0.9999);

      return new google.maps.Point(
          TILE_SIZE * (0.5 + latLng.lng() / 360),
          TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
    }
  }

  componentDidMount() {
    const component = this;
    this.map = this.renderMap();
    this.mappedMap = null;
    socket.on('tweet coordinates', (coordinates) => {
      component.map = component.renderMap();
      console.log(coordinates, component.props.coordinates);
      const mapped = component.props.coordinates.map((index, i) => {
        const name = index.username;
        const profpic = index.profpic;
        const capt = index.text;
        const date = index.date;
        const mappedImages = index.entities.media ? index.entities.media.map((media, i) => {
          const arr = [];
          arr.push(`<img src=${media.media_url_https} alt="media" />`);
          return arr
        }) : [''];
        const mappedUrls = index.entities.urls ? index.entities.urls.map((media, i) => {
          const arr = [];
          arr.push(`<a href=${media.expanded_url} target="_blank">${media.expanded_url}</a>`);
          return arr
        }) : [''];
        const mappedHash = index.hashtags.length ? index.hashtags.map((hash, i) => {
          const arr = [];
          arr.push(`<a href="https://twitter.com/#${hash.text}" target="_blank">#${hash.text}</a>`);
          return arr;
        }) : [''];
        const info = [
          `<a href=${"http://twitter.com/"+name} target="_blank"><img src=${profpic} alt=${name} /></a>`,
          `<a href=${"http://twitter.com/"+name} target="_blank"><h5>${name}</h5></a>`,
          `<div class="media">${mappedImages.join('</br>')}</div>`,
          `<div class="urls">${mappedUrls.join('</br>')}</div>`,
          `<p>${capt}</p>`,
          `<p><small>${date}</small></p>`,
          `<div class="tags">${mappedHash.join(' ')}</div>`
        ];
        const loc = index.geo ? new google.maps.LatLng(index.geo.coordinates[0], index.geo.coordinates[1]) : null;
        const res = {
          info,
          loc,
        };
        return res;
      });
      for (let i = 0; i < mapped.length; i++) {
        component.mappedMap = component.renderMarker((mapped[i].loc ? mapped[i].loc : null), component.map, mapped[i].info);
      }
    });
  }


  render() {
    return (
      <div class={this.props.appState.loading ? "mapWrap wait" : "mapWrap"}>
        <div class="fetch"> Fetch ... </div>
        <div ref="map" class="map">Loading map here ...</div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    appState: store.appState,
  }
})(Map);
