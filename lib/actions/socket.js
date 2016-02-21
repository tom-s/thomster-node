import socketService from '../services/socket';

export const SOCKET_READY = 'SOCKET_READY';
export const SOCKET_CONNECTION = 'SOCKET_CONNECTION';
export const SOCKET_DISCONNECTION = 'SOCKET_DISCONNECTION';

function socketReady() {
	return {
		type: SOCKET_READY,
		ready: true
	};
}

export function connection() {
	return {
		type: SOCKET_CONNECTION
	};
}

export function disconnection() {
	return {
		type: SOCKET_DISCONNECTION
	};
}

export function initSocket() {
	return function(dispatch, getState) {
		let io = socketService.init();
		dispatch(socketReady());

		io.on('connection', (socket) => {
			store.dispatch(actions.connection());

			socket.on('connect', () => {
				socketService.emitToSocket(socket, store.getState().toJS()); // emit current state
				store.dispatch(actions.connection());
			})
			socket.on('disconnect', () => {
		        store.dispatch(actions.disconnection());
		    });
  		});
	};
}