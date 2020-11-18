import {
	FETCH_COLLECTIONS_FAILURE,
	FETCH_COLLECTIONS_START,
	FETCH_COLLECTIONS_SUCCESS,
} from './shop.types';

import {
	firestore,
	convertCollectionsSnapShotToMap,
} from '../../firebase/firebase.utils';

// we usually write a function that returns an action/object
// we are going to write a function that returns a function
// that gets dispatch in it, when ever dispatch is called it fill fire multiple actions
export const fetchCollectionsStart = () => ({
	type: FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
	type: FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = (error) => ({
	type: FETCH_COLLECTIONS_FAILURE,
	payload: error,
});

// Thunk ex, is just a function that returns a function that gets acces to dispatch
export const fetchCollectionsStartAsync = () => (dispatch) => {
	const collectionRef = firestore.collection('collections');
	// dispatches fetchCollectionsStart, which changes our isFetching state to true
	dispatch(fetchCollectionsStart());

	// it begins this async request this is why we use redux-thunk
	collectionRef
		.get()
		.then((snapshot) => {
			const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
			dispatch(fetchCollectionsSuccess(collectionsMap));
		})
		.catch((error) => dispatch(fetchCollectionsFailure(error.message)));
};
