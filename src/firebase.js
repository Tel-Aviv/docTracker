import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyBpK5b4X9fYLaYQKK7ebgjQCQkDGW3uKok",
  authDomain: "docktracker-8b6f9.firebaseapp.com",
  databaseURL: "https://docktracker-8b6f9.firebaseio.com",
  projectId: "docktracker-8b6f9",
};

const firebaseApp = firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebaseApp;
