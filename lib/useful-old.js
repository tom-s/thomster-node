// 
/*
function keyIn() {
  		let keySet = Immutable.Set(arguments); 
  		return (v, k) => {
    		return keySet.has(k);
  		}
	}
	function select(state) {
		console.log("state", state);
		return state.filterNot(keyIn('db')); // pick everything but DB settings
	}

	let currentValue;
	function hasStateChanged(newValue) {
	 	let previousValue = currentValue;
	 	currentValue = newValue;
		return (previousValue !== newValue);
	}

*/
export function startServer(store) {

	
  	

  	


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