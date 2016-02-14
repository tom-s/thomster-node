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
	

	let _getLatest = (num, cb, errorCb) => {
		// Retrieve latest 10 messages
		Message.limit(num).run().then((msgs) => {
			if(cb && _.isFunction(cb)) cb(msgs);
		}).catch(Errors.DocumentNotFound, (err) => {
		   	if(cb && _.isFunction(cb)) cb([]);
		}).error((error) => {
		    // Unexpected error
		    if(errorCb && _.isFunction(errorCb)) cb(err);
		});
	}

	let _insert = (msg, cb, errorCb) => {
		let dbMsg = _formatMsg(msg);
		Message.save(dbMsg).then((result) => {
			if(cb && _.isFunction(cb)) cb(result);
		}).catch(Errors.ValidationError, (err) => {
		    if(errorCb && _.isFunction(errorCb)) cb(err);
		}).error((error) => {
		    // Unexpected error
		    if(errorCb && _.isFunction(errorCb)) cb(err);
		});
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



