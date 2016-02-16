import {DB_READY, DB_ERROR} from './actions';
import {INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
    console.log("action !", action.type);
    switch (action.type) {
        case DB_READY:
        case DB_ERROR:
            return state.merge({
                rdb: action.rdb
            });
    }
  return state;
}