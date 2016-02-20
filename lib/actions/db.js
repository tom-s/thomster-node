import dbService from '../services/db';

export const DB_READY = 'DB_READY';
export const DB_ERROR = 'DB_ERROR';


const dbReady = (conn, db) => {
	console.log("ready");
  	return {
  		type: DB_READY,
    	db: {
    		ready: true,
    		conn: conn,
    		db: db
    	}
  	};
}

const dbError = (error) => {
	console.log("error !");
	return {
		type: DB_ERROR,
		db: {
			ready:false
		}
	};
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(initDb())

export function initDb() {

	// Thunk middleware knows how to handle functions.
	// It passes the dispatch method as an argument to the function,
	// thus making it able to dispatch actions itself.

	return (dispatch, getState) => {

	   
		// The function called by the thunk middleware can return a value,
	    // that is passed on as the return value of the dispatch method.

	    // In this case, we return a promise to wait for.
	    // This is not required by thunk middleware, but it is convenient for us.
	    // 
	    
	    // Dispatch a thunk from thunk!
      	return dbService.connect().then(
	     	(conn, db) => {
	     		console.log("hourra");
	     		dispatch(dbReady(conn, db))
	     	},
	     	(error) => {
	     		console.log("oups");
	     		dispatch(dbError(error))
	     	}
	    );
	};
}