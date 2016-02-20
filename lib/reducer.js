import combineReducers from 'redux-immutable-combine-reducers';
import db from './reducers/db';
import socket from './reducers/socket';

const reducer = combineReducers({
    'database': db,
    'socket': socket
});

export default reducer;
