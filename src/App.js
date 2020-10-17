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

import { auth, createuserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		// returns firebase.Unsubscribe, it's an 	api call
		// Adds an observer for changes to the user's sign-in state.
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// if not null
			if (userAuth) {
				const userRef = await createuserProfileDocument(userAuth);

				//  we either get a new user or a current user
				userRef.onSnapshot((snapShot) => {
					// data, we can see the properties
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			} else {
				setCurrentUser(userAuth);
			}
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
