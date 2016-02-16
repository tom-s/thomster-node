import {createStore, applyMiddleware} from 'redux';
import {startServer} from './server';
import thunk from 'redux-thunk';
import reducer from './reducer.js';
import {initDb, getMessages} from './actions.js';

export const store = createStore(
	reducer,
	applyMiddleware(thunk)
);


// Start socket
startServer(store);


// Start DB
console.log("fun", initDb);
store.dispatch(initDb()).then(() => {
  console.log("db instanciated !");
  store.dispatch(getMessages());
}, (error) => {
	console.log("error instanciating db", error);
});
