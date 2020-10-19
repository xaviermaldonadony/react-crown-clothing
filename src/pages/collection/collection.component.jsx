import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors.js';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
	const { title, items } = collection;
	return (
		<div className='collection-page'>
			<h2 className='title'>{title}</h2>
			<div className='items'>
				{items.map((item) => (
					<CollectionItem key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	// we pass  Id to our selector0.
	// createSelector, returns a function that takes the state and runs it trought the flow , this selector needs part of the state depending of the url paramater
	// we pass state to the function that is returned  fro selectCollection
	collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
