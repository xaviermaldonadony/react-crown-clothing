import { takeLatest, call, put } from 'redux-saga/effects';

import {
	firestore,
	convertCollectionsSnapShotToMap,
} from '../../firebase/firebase.utils';

import {
	fetchCollectionsSuccess,
	fetchCollectionsFailure,
} from './shop.actions';

import { FETCH_COLLECTIONS_START } from './shop.types';

export function* fetchCollectionsAsync() {
	// yield console.log('I am fired');

	try {
		const collectionRef = firestore.collection('collections');
		const snapshot = yield collectionRef.get();
		// call(func, parameters)
		const collectionsMap = yield call(
			convertCollectionsSnapShotToMap,
			snapshot
		);
		// put, dispatches our action
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}

export function* fetchCollectionsStart() {
	// takes the latest call
	yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
