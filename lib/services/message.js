import _ from 'lodash';
import think from 'thinky';

// Thinky conf
let Thinky = think({
	db: 'thomster'
});
let Type = Thinky.type;
let Errors = Thinky.Errors;

export default (() => {

	// Models
	let Message = Thinky.createModel("Message", {});
	

	function getLatest(num = 10) {
		// Retrieve latest 10 messages
		Message.limit(num).run().then((msgs) => {
			// action to do
		}).catch(Errors.DocumentNotFound, (err) => {
		   	// action to do
		}).error((error) => {
		    // Unexpected error
		    // action to do
		});
	}

	function insert(msg) {
		let dbMsg = _formatMsg(msg);
		Message.save(dbMsg).then((result) => {
			// action to do
		}).catch(Errors.ValidationError, (err) => {
		    // action to do
		}).error((error) => {
		    // Unexpected error
		    // action to do
		});
	}

	function _formatMsg(msg) {
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
		getLatest: getLatest,
		insert: insert
	}	
})();



