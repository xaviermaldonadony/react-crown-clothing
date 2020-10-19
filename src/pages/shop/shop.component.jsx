import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverView from '../../components/collections-overview/collections-overview.components';
import CollectionPage from '../collection/collection.component';

// we get match becuase or component is inside of a Route
const ShopPage = ({ match }) => {
	console.log(match);
	return (
		<div className='shop-page'>
			<Route exact path={`${match.path}`} component={CollectionsOverView} />
			<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
		</div>
	);
};

export default ShopPage;
