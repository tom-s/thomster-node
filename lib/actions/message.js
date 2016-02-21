import dbService from '../services/db';

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const MESSAGE_ADDED = 'MESSAGE_ADDED';
export const MESSAGE_ADDED_ERROR = 'MESSAGE_ADDED_ERROR';

function messageAdded(msg) {
  	return {
  		type: MESSAGE_ADDED,
    	message: msg
  	};
}

function messageAddedError(error) {
  	return {
  	};
}


// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(initDb())

export function initMessage() {

	// Thunk middleware knows how to handle functions.
	// It passes the dispatch method as an argument to the function,
	// thus making it able to dispatch actions itself.

	return function(dispatch, getState) {

	   
		// The function called by the thunk middleware can return a value,
	    // that is passed on as the return value of the dispatch method.

	    // In this case, we return a promise to wait for.
	    // This is not required by thunk middleware, but it is convenient for us.
	    // 
	    
	    // Dispatch a thunk from thunk!
      	return dbService.connect().then(
	     	(conn, db) => {
	     		dispatch(dbReady(conn, db))
	     	},
	     	(error) => {
	     		dispatch(dbError(error))
	     	}
	    );
	};
}