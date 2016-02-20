import {MESSAGE_ADDED, MESSAGE_ADDED_ERROR} from '../actions/message';
import {MESSAGE_INITIAL_STATE} from '../constants/message';

export default function message(state = MESSAGE_INITIAL_STATE, action) {
    switch (action.type) {
        case MESSAGE_ADDED:
        	console.log("message added", action.message);
            return state.push(action.message);
        case MESSAGE_ADDED_ERROR:
        	// todo
        default:
            return state;
    }
}