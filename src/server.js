const express = require('express');
const {createServer} = require('http');
const WebSocket = require('ws');
const {createReason} = require('./controllers/wsController.js');
const routes = require('./routes/index.js');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.name = 'API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/whyapp', routes)

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


const server = createServer(app);

const wss = new WebSocket.Server({
	server
});

wss.on('connection', (ws)=>{

	ws.isAlive = true;

	ws.on('pong', ()=>{
		ws.isAlive = true
	});

	ws.on('message', async (message)=>{
		
		console.log('recived %s', message);

		const parsedMessage = JSON.parse(message);

		const storedMessage = await createReason(parsedMessage)
		
		ws.send(`Hello, your reason has been stored`)
	});

	ws.send('Hi there, I am a WebSocket server')

	ws.on('error', (err)=>{
		console.warn(`Client disconnected - reason: ${err}`)
	});

});

setInterval(()=>{
	wss.clients.forEach((ws)=>{
		if(!ws.isAlive) return ws.terminate();

		ws.isAlive=false;
		ws.ping(null, false, true)
	});
}, 10000)


module.exports = server