import Socket from 'socket.io';
import Actions from '../actions/socket'

const socketService = (() => {
	
	let io = null;

	function init() {
		return new Socket().attach(9000);
	}


	// Public
	return {
		init: init
	};

})();

export default socketService;