import {Map} from 'immutable';

export const DB_INITIAL_STATE = Map({
	db : {
		ready: false,
		conn: null,
		db: null
	}
});