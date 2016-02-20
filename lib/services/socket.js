import Socket from 'socket.io';
import Actions from '../actions/socket'

const socketService = (() => {
	
	let io = null;

	function init() {
		io = new Socket().attach(9000);

		io.on('connection', (socket) => {
			store.dispatch(actions.connection());

			socket.on('disconnect', function(){
		        store.dispatch(actions.disconnection());
		    });
  		});
	}


	// Public
	return {
		init: init
	};

})();

export default socketService;