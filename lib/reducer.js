import combineReducers from 'redux-immutable-combine-reducers';
import db from './reducers/db';

const reducer = combineReducers({
    'database': db
});

export default reducer;
