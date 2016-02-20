
import {SOCKET_READY, SOCKET_CONNECTION, SOCKET_DISCONNECTION} from '../actions/socket';
import {SOCKET_INITIAL_STATE} from '../constants/socket';

export default function socket(state = SOCKET_INITIAL_STATE, action) {
    switch (action.type) {
        case SOCKET_READY:
            return state.set('socket', action.socket);
        case SOCKET_CONNECTION:
        	return ;
        case SOCKET_DISCONNECTION:
        	return ;
        default:
            return state;
    }
}