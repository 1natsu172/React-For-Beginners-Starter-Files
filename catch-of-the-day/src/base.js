import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp(
  {
    apiKey: "AIzaSyAQetDclMQsNm3J0s1UFJp3fmQavvohl0g",
    authDomain: "catch-of-the-day-reactlearn.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-reactlearn.firebaseio.com",
  }
)

const base = Rebase.createClass(firebaseApp.database())

export default base

export {firebaseApp}