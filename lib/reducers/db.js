
import {DB_READY, DB_ERROR} from '../actions/db';
import {DB_INITIAL_STATE} from '../constants/db';

export default function db(state = DB_INITIAL_STATE, action) {
    switch (action.type) {
        case DB_READY:
        case DB_ERROR:
            return state.set('db', action.db);
        default:
            return state;
    }
}