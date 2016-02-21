import Socket from 'socket.io';
import Actions from '../actions/socket'

const socketService = (() => {
	
	let io = null;

	function init() {
		return new Socket().attach(9000);
	}

	function emitToSocket(socket, data) {
		
	}


	// Public
	return {
		init: init,
		emitToSocket: emitToSocket
	};

})();

export default socketService;