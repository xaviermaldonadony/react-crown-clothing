import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
	const { name, price, imageUrl } = item;
	return (
		<div className='collection-item'>
			<div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className='collection-footer'>
				<span className='name'>{name}</span>
				<span className='price'>&#x24;{price}</span>
			</div>
			<CustomButton onClick={() => addItem(item)} inverted>
				Add to cart
			</CustomButton>
		</div>
	);
};

const mapDispatchToProp = (dispatch) => ({
	// we call addItem func, the func receives item as a property
	// passes it into addItem action creator which fives us back an objecta
	// which has the type and the payload is item
	//  and then we dispatch that new object to our store and it go troguh our redux flow
	addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProp)(CollectionItem);
