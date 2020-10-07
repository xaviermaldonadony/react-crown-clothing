// all of the other imports are attached to this keyword
import firebase from 'firebase/app'; // use to create Firebase instance
import 'firebase/firestore'; // for the database
import 'firebase/auth'; // for the auth
import FIREBASE_CONFIG from './firebase.config';

const config = FIREBASE_CONFIG;

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
