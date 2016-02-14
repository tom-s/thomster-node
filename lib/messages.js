import _ from 'lodash';
import think from 'thinky';
let Thinky = think({
	db: 'thomster'
});
let Type = Thinky.type;
let Errors = Thinky.Errors;

export default (() => {

	// Models
	let Message = Thinky.createModel("Message", {});
	
	let _init = (onFeed) => {

		// Subscribe to changes
		Message.changes().then((cursor) => {
			cursor.each((err, feed) => {
            	if (err) throw err;
            	_onFeed(feed, onFeed);
        	});
    	});
	}

	let _getLatest = (num) => {
		// Retrieve latest 10 messages
		Message.limit(num).run().then((msg) => {
			console.log("LATEST 20 MESSAGES", msg);
		}).catch(Errors.DocumentNotFound, (err) => {
		    console.log("No message yet");
		}).error((error) => {
		    // Unexpected error
		});
	}

	let _insert = (msg) => {
		let dbMsg = _formatMsg(msg);
		Message.save(dbMsg).then((result) => {

		}).catch(Errors.ValidationError, (err) => {
		    console.log("Validation Error: " + err.message)
		}).error((error) => {
		    // Unexpected error
		    console.log("unexpected error", error);
		});
	}

	let _onFeed = (msg, onFeed) => {
	    // do personal stuff
	    if(onFeed && _.isFunction(onFeed)) {
	    	console.log("call onfeed", msg);
	    	onFeed(msg);
	    }
	}


	let _formatMsg = (msg) => {
	    // Move user id to make things easier
	    msg.sender = {
	        user_id: _.get(msg, 'data.subject.user_id'),
	        sender_id:  _.get(msg, 'data.subject.sender_id'),
	        sender_type:  _.get(msg, 'data.subject.sender_type'),
	        name: _.get(msg, 'data.subject.name'),
	        avatar_url: _.get(msg, 'data.subject.avatar_url')
	    };

	    msg.data.subject = _.omit(msg.data.subject, ['user_id', 'sender_id', 'sender_type', 'name', 'avatar_url']);
	    return msg;
	}


	
	return {
		init: _init,
		insert: _insert
	}	
})();



