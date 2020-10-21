import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import {
	auth,
	createuserProfileDocument,
	addCollectionAndDocuments,
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser, collectionsArray } = this.props;
		// returns firebase.Unsubscribe, it's an 	api call
		// Adds an observer for changes to the user's sign-in state.
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// if not null
			if (userAuth) {
				const userRef = await createuserProfileDocument(userAuth);

				//  we either get a new user or a current user
				// listener
				userRef.onSnapshot((snapShot) => {
					// data, we can see the properties
					// we set the current user object in our redux reducer
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			} else {
				setCurrentUser(userAuth);
			}
			addCollectionAndDocuments(
				'collections',
				collectionsArray.map(({ title, items }) => ({ title, items }))
			);
		});
	}

	componentWillUnmount() {
		// trigger it when component unmounts
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route exact path='/checkout' component={CheckoutPage} />
					<Route
						exact
						path='/signIn'
						// render, what component to retyrb
						render={() =>
							this.props.currentUser ? (
								<Redirect to='/' />
							) : (
								<SignInAndSignUpPage />
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	collectionsArray: selectCollectionsForPreview,
});

const mapDispatchtoProps = (dispatch) => ({
	// retrun setCurrentUser
	// it goes to a function that gets the user object and calls dispatch.
	// what ever object pass to dispatch, is an ction object that is going to pass to every reducer
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

//  null, becuase we dont need any state to props from our reducer
export default connect(mapStateToProps, mapDispatchtoProps)(App);

// 25
