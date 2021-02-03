import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrexT2di3fGlVgJI5reos2yJ6zLZkLpTs",
  authDomain: "jak-signal-clone.firebaseapp.com",
  projectId: "jak-signal-clone",
  storageBucket: "jak-signal-clone.appspot.com",
  messagingSenderId: "247242298247",
  appId: "1:247242298247:web:d4b8d587968bbfacb47922"
};

let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
