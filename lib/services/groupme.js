/*********** GROUPME ***************/ //TODO
const ACCESS_TOKEN = Config.ACCESS_TOKEN;
const BOT_ID = Config.BOT_ID;
const GROUP_ID = Config.GROUP_ID;
const USER_ID = Config.USER_ID;

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