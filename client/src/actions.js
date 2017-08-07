/*
 *
 * ChatHome actions
 *
 */
 import {
   RESET,
   NEW_TWEET,
   FIRST_RATE,
   SECOND_RATE,
   FINISH_LOADING,
   NEW_COORDINATE
 } from './constants';



 // remove tweet list
 export function resetState() {
   return {
     type: RESET
   }
 }

 // stream tweet
 export function newTweet(payload, cb) {
   cb();
   return{
     type: NEW_TWEET,
     payload
   }

 }

 // percentage for first option
 export function firstRate(payload) {
   return{
     type: FIRST_RATE,
     payload
   }
 }

 // percentage for second option
 export function secondRate(payload) {
   return{
     type: SECOND_RATE,
     payload
   }
 }

 // finish loading tweet list
 export function finishLoading() {
   return{
     type: FINISH_LOADING,
   }
 }

 export function newCoordinate(payload) {
   return {
     type: NEW_COORDINATE,
     payload
   }
 }
