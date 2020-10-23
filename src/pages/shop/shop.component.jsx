import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
	firestore,
	convertCollectionsSnapShotToMap,
} from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinnger.component';

import CollectionsOverView from '../../components/collections-overview/collections-overview.components';
import CollectionPage from '../collection/collection.component';

const CollectionsOverViewWithSpinner = WithSpinner(CollectionsOverView);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// we get match becuase or component is inside of a Route
class ShopPage extends React.Component {
	state = {
		loading: true,
	};
	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');

		// fetch(
		// 	'https://firestore.googleapis.com/v1/projects/crown-db-eccd1/databases/(default)/documents/collections'
		// )
		// 	.then((response) => response.json())
		// 	.then((collections) => console.log(collections));

		// promise, no observer pattern
		// we will only get new data when we remount
		collectionRef.get().then((snapshot) => {
			const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
			updateCollections(collectionsMap);
			this.setState({ loading: false });
		});

		// collectionRef.onSnapshot(async (snapshot) => {
		// 	const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
		// 	updateCollections(collectionsMap);
		// 	this.setState({ loading: false });
		// });
	}

	render() {
		const { match } = this.props;
		const { loading } = this.state;

		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<CollectionsOverViewWithSpinner isLoading={loading} {...props} />
					)}
				/>
				<Route
					path={`${match.path}/:collectionId`}
					// render takes afunction where the params in the func, are the parms the omponent will
					// receive
					irender={(props) => (
						<CollectionPageWithSpinner isLoading={loading} {...props} />
					)}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collectionsMap) =>
		dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
