import thunk from 'redux-thunk';
import Immutable from 'immutable';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import {initDb} from './actions/db';
import {initSocket} from './actions/socket';

export const store = createStore(
	reducer,
	compose(
	    applyMiddleware(thunk)
	  )
);

// Subscribe to store changes (for debug)
store.subscribe(() => {
	console.log("state has changed", store.getState().toJS());
});

// Start socket
store.dispatch(initSocket());

// Start DB
store.dispatch(initDb());

// Testing of socket counter
/*
import {connection} from './actions/socket';
store.dispatch(connection());
*/