import r from 'rethinkdb';

const dbService = (() => {
	function connect() {
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


	// Public
	return {
		connect: connect
	};

})();

export default dbService;