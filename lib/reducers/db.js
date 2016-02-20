
import {DB_READY, DB_ERROR} from '../actions/db';
import constants from '../constants/db';

const db = (state = constants.DB_INITIAL_STATE, action) => {
	console.log("action type", action.type);
    switch (action.type) {
        case DB_READY:
        case DB_ERROR:
            return state.set('db', action.db);
        default:
            return state;
    }
    
}

export default db;