import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {startServer} from './server';
import reducer from './reducer';
import {initDb} from './actions/db';

export const store = createStore(
	reducer,
	applyMiddleware(thunk)
);


// Start socket
startServer(store);


// Start DB
store.dispatch(initDb()).then(() => {
	//  store.dispatch(getMessages());
	console.log("db instanciated")
}, (error) => {
	console.log("error instanciating db", error);
});
