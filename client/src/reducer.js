/*
 *
 * ChatHome reducer
 *
 */
import Immutable from 'immutee';
import {
  RESET,
  NEW_TWEET,
  FIRST_RATE,
  SECOND_RATE,
  FINISH_LOADING,
  NEW_COORDINATE
} from './constants';
const initialState = {
  tweet: [],
  first: 0,
  second: 0,
  loading: false,
  coordinates: []
};



export default function(state = initialState, action) {
  // console.log(state.merge('user', "nasser").done());
  const immutee = Immutable(state);
  var log = [];
  switch(action.type) {
    case RESET: {
      return immutee.set('tweet', []).set('coordinates', []).set('first', 0).set('second', 0).done();
      break;
    }
    case NEW_TWEET: {
      var newState = immutee
          .set('loading', true)
          .merge('tweet', [action.payload])
          .done();

      return newState;
      break;
    }
    case FIRST_RATE: {
      return immutee.set('first', action.payload).done();
      break;
    }
    case SECOND_RATE: {
      return immutee.set('second', action.payload).done();
      break;
    }
    case FINISH_LOADING: {
      return immutee.set('loading', false).done();
      break;
    }
    case NEW_COORDINATE: {
      var newState = immutee
          .merge('coordinates', [action.payload])
          .done();

      return newState;
      break;
    }
    default: {
      return state;
    }
  }
}
