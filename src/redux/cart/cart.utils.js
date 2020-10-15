export const addItemToCart = (cartItems, cartItemToAdd) => {
	const existingCartItem = cartItems.find(
		(cartitem) => cartitem.id === cartItemToAdd.id
	);

	if (existingCartItem) {
		// returns a new array
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToAdd.id
				? { ...cartItem, quantity: ++cartItem.quantity }
				: cartItem
		);
	}

	// if not found  in our array, create a new array
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
