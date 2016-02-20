import Socket from 'socket.io';
import Immutable from 'immutable';

export function startServer(store) {

	function keyIn() {
  		let keySet = Immutable.Set(arguments); 
  		return (v, k) => {
    		return keySet.has(k);
  		}
	}
	function select(state) {
		console.log("state", state);
		return state.filterNot(keyIn('rdb')); // pick everything but DB settings
	}

	let currentValue;
	function hasStateChanged(newValue) {
	 	let previousValue = currentValue;
	 	currentValue = newValue;
		return (previousValue !== newValue);
	}


  	store.subscribe(() => {
  		let reducedState = select(store.getState());
  		if(hasStateChanged(reducedState) && reducedState.size > 0) {
  			console.log("state has changed");
   			io.emit('state', store.getState().toJS());
  		} else {
  			console.log("state has changed, but nothing interesting really happened (just DB connection)");
  		}
   	});

  	

  	


	/**** Feed handling TODO ***/
	let _onFeed = (cursor) => {
	    cursor.each((err, feed) => {
	        if (err) throw err;
	        let type = null;

	        if (doc.isSaved() === false) {
	            type = 'DELETED';
	        }
	        else if (doc.getOldValue() == null) {
	            type = 'INSERTED';
	        } else {
	            type = 'UPDATED';
	        }

	        let message = (doc.getModel().getTableName() + '_' + type).toUpperCase();
	        console.log("emit event", message, doc);
	        ioSocket.emit(message, doc);
	    });
	}

}