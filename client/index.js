import 'file-loader?name=index.html!./index.html';
import 'babel-polyfill';
import './src/style.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import Layout from "./src";

const dom = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  dom
);
