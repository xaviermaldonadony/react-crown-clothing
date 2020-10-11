import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createuserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUser: null,
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		// returns firebase.Unsubscribe
		// api call
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// if not null
			if (userAuth) {
				const userRef = await createuserProfileDocument(userAuth);

				//  we either get a new user or a current user
				userRef.onSnapshot((snapShot) => {
					// data, we can see the properties
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data(),
						},
					});
				});
			} else {
				this.setState({ currentUser: userAuth });
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
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route path='/signIn' component={SingInAndSignUpPage} />
				</Switch>
			</div>
		);
	}
}

export default App;

//12
