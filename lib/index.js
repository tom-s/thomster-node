

import Config from '../config';
import _ from 'lodash';
import http from 'http';
import GroupMe from 'groupme';
import socketIo from 'socket.io';


const ACCESS_TOKEN = Config.ACCESS_TOKEN;
const BOT_ID = Config.BOT_ID;
const GROUP_ID = Config.GROUP_ID;
const USER_ID = Config.USER_ID;


/*********** WEB SOCKET  ***************/
var io = socketIo(9000);
var ioSocket = {
    emit: function(event, data) {
        console.log("no socket available");
    },
    on: function(event, cb) {
        console.log("no socket available");
    }
};

/* Initialize sockets */
io.on('connection', function(socket){
    console.log('a user connected');
    ioSocket = socket; 
    ioSocket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


/*********** GROUPME ***************/
let Api = GroupMe.Stateless;
let Incoming = GroupMe.IncomingStream;

// Register to events
let iStream = new Incoming(ACCESS_TOKEN, USER_ID);

iStream.connect();

iStream.on('connected', () => {
	console.log("connection established with group thomster");
});

iStream.on('disconnected', () => {
    console.log("disconnected");
	iStream.connect();	
});

iStream.on('pending', () => {
    console.log("pending");
});

iStream.on('status', (msg, payload) => {
    console.log("status", msg, payload); 
});

iStream.on('error', (msg, payload) => {
    console.log("error connecting", msg, payload);
    iStream.disconnect();
	iStream.connect();
});

iStream.on('message', (msg) => {
	// Ignore ping message
	var type = _.get(msg, 'data.type');
	var sender = _.get(msg, 'data.subject.name');
    var reconnect = _.get(msg, 'advice.reconect');
    if(reconnect === 'retry') {
        console.log("reconnect !");
        iStream.disconnect();
        iStream.connect();
        return;
    }
	if(type === 'ping') return;
	if(sender === 'Wendy') return;
   	console.log("[MESSAGE RECEIVED'] Message Received", msg);
   	ioSocket.emit('GROUPME_MESSAGE_RECEIVED', msg );
});

// Say hello
Api.Bots.post(ACCESS_TOKEN, BOT_ID, 'Hello World, Thomster is up and running again', {}, () => {
	console.log("Hello World, Thomster is up and running again")
});
