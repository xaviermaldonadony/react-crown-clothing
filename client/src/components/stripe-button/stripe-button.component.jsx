import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import './stripe-button.styles.scss';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51HdswLHzrq0rQWgGa9ePqixUAJJAvgyT7zZP4jSZiehAPfmflkjcr4CLIeFy7JI107ftMFNuG7stXDuWgf9PJxEJ00DrBYBQz3';

	const onToken = (token) => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then((response) => {
				alert('Payment Successful');
			})
			.catch((error) => {
				console.log('payment error:', error);
				alert(
					'There was an issue with your payment. Please sure you use the provided cred cart '
				);
			});
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='Crown Clothing Ltd.'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
