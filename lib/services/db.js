import r from 'rethinkdb';

const dbService = (() => {
	function connect() {
		var promise = new Promise((resolve, reject) => {
			r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
				if (err) {
					reject(err);
				}
				let db = r.db('thomster');

				// subscribe
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