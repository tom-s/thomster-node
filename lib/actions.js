import r from 'rethinkdb';


export const DB_READY = 'DB_READY';
export const DB_ERROR = 'DB_ERROR';

/* This should be in a service */
function dbConnect() {
	var promise = new Promise((resolve, reject) => {
		r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
			if (err) {
				console.log("reject");
				reject(err);
			}
			let db = r.db('thomster');

			// We can dispatch many times!
		    // Here, we update the app state with the results of the API call.
		    resolve(conn, db);
		});
	});
	return promise;
}

function dbReady(conn, db) {
  	return {
  		type: DB_READY,
    	db: {
    		ready: true,
    		conn: conn,
    		db: db
    	}
  	};
}

function dbError(error) {
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

	return function (dispatch, getState) {

	   
		// The function called by the thunk middleware can return a value,
	    // that is passed on as the return value of the dispatch method.

	    // In this case, we return a promise to wait for.
	    // This is not required by thunk middleware, but it is convenient for us.
	    // 
	    
	    // Dispatch a thunk from thunk!
      	return dbConnect().then(
	     	(conn, db) => {
	     		dispatch(dbReady(conn, db))
	     	},
	     	(error) => {
	     		dispatch(dbError(error))
	     	}
	    );
	};
}