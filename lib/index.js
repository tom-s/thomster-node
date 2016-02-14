

import Config from '../config';
import Messages from './messages';
import _ from 'lodash';
import http from 'http';
import GroupMe from 'groupme';
import socketIo from 'socket.io';
import r from 'rethinkdb';


const ACCESS_TOKEN = Config.ACCESS_TOKEN;
const BOT_ID = Config.BOT_ID;
const GROUP_ID = Config.GROUP_ID;
const USER_ID = Config.USER_ID;

// Variables


/*********** WEB SOCKET  ***************/
let io = socketIo(9000);
let ioSocket = {
    emit: function(event, data) {
        console.log("no socket available");
    },
    on: function(event, cb) {
        console.log("no socket available");
    }
};

// Initialize sockets
io.on('connection', function(socket){
    console.log('a user connected');
    ioSocket = socket; 
    ioSocket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

/*********** DATABASE **********/
let db = null;
let dbConn = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) {
        console.log("err", err);
        throw err;
    }
    dbConn = conn;
    db = r.db('thomster');

    // Register to live events
    Messages.init(_onFeed.bind(this));
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
});

iStream.on('message', (msg) => {

	// Ignore ping message
	let type = _.get(msg, 'data.type');
	let sender = _.get(msg, 'data.subject.name');
    let reconnect = _.get(msg, 'advice.reconnect');
   
    if(reconnect === 'retry') {
        iStream.disconnect();
        return;
    }
	if(type === 'ping') return;
	//if(sender === 'Wendy') return;

    // Insert message
    Messages.insert(msg);
});

// Say hello
/*
Api.Bots.post(ACCESS_TOKEN, BOT_ID, 'Hello World, Thomster is up and running again', {}, () => {
	console.log("Hello World, Thomster is up and running again")
});*/




/**** Feed handling ***/
let _onFeed = (doc) => {
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
}
