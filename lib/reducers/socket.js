import {SOCKET_READY, SOCKET_CONNECTION, SOCKET_DISCONNECTION} from '../actions/socket';
import {SOCKET_INITIAL_STATE} from '../constants/socket';

export default function socket(state = SOCKET_INITIAL_STATE, action) {
    switch (action.type) {
        case SOCKET_READY:
            return state.set('ready', action.ready);
        case SOCKET_CONNECTION:
        	return state.update('connectionsCount', (count) => { return ++count;});
        case SOCKET_DISCONNECTION:
        	return state.update('connectionsCount', (count) => { return --count;});
        default:
            return state;
    }
}