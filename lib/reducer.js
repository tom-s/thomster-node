import combineReducers from 'redux-immutable-combine-reducers';
import {DB_READY, DB_ERROR} from './actions';
import constants from './constants';

function db(state = constants.DB_INITIAL_STATE, action) {
    switch (action.type) {
        case DB_READY:
        case DB_ERROR:
            return state.set('db', action.db);
        default:
            return state;
    }
    
}

const reducer = combineReducers({
    'database': db
});

export default reducer;