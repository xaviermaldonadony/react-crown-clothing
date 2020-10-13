// add middle ware to our store so when actions get fired or dispatched
// we catch em. The middlewares are pretty much functions that receive actions
// do something to them and pass em to the root reducer
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
