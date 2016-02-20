import {Map} from 'immutable';

const constants = {
	'DB_INITIAL_STATE' : Map({
		db : {
			ready: false,
			conn: null,
			db: null
		}
	})
};

export default constants;