// all of the other imports are attached to this keyword
import firebase from 'firebase/app'; // use to create Firebase instance
import 'firebase/firestore'; // for the database
import 'firebase/auth'; // for the auth
import FIREBASE_CONFIG from './firebase.config';

const config = FIREBASE_CONFIG;

//  take our user from auth and store it inot our database
// api request therefore async
export const createuserProfileDocument = async (userAuth, additionalData) => {
	// cehck for a valid object
	if (!userAuth) {
		return;
	}

	// doc lets us do crud operations
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	// firebase always give su back a snapshot object even if there is no user in the db
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

firebase.initializeApp(config);

//
export const addCollectionAndDocuments = async (collectionKey, objecToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	// firestore can only make on set call at a time
	// create a batch just in case we have an error and we don't set all of
	//  our data if we were looping it
	const batch = firestore.batch();
	objecToAdd.forEach((obj) => {
		// it is saying, give me a new doc reference in this collection
		// and it generates a new random id
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});
	// returns a promise
	return await batch.commit();
};
// initialize
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
