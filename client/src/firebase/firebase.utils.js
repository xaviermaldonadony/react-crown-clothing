// all of the other imports are attached to this keyword
import firebase from 'firebase/app'; // use to create Firebase instance
import 'firebase/firestore'; // for the database
import 'firebase/auth'; // for the auth
import FIREBASE_CONFIG from './firebase.config';

const config = FIREBASE_CONFIG;
// Initialize Firebase
firebase.initializeApp(config);
//  take our user from auth and store it inot our database
// api request therefore async
export const createuserProfileDocument = async (userAuth, additionalData) => {
	// cehck for a valid object
	if (!userAuth) {
		return;
	}

	// doc lets us do crud operations
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();
	// console.log(userAuth);
	// console.log(snapShot);

	// if it doesn't exsists create user on database
	if (!snapShot.exists) {
		// properties we want to save
		const { displayName, email } = userAuth;
		// current date and time when this is saved
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	// for future reference for us
	return userRef;
};

export const convertCollectionsSnapShotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data();
		console.log('firebase utils');
		console.log(title, items);

		return {
			routeName: encodeURI(title),
			id: doc.id,
			title,
			items,
		};
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

// create a new promise to use in our sagas
export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};

// initialize
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// we want the object with sagas, we are no longer using the listener in app.js to tell us
// if it's signed in or not
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
