const express = require('express');
const {Server} = require('ws');
const application = express()

//var db = require(`./db.js`);

application.use(express.json());
const userRouter = require('./users.js');
application.use('/users', userRouter);

const PORT = process.env.PORT || 3000;

// const server = express().use((req, res) => res.send('Hello World!')).listen(PORT, () => console.log(`Listening on ${PORT}`));
const server = application.listen(PORT, ()=>console.log(`Listening on ${PORT}`));
const wss = new Server({server});

wss.on ('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', message => console.log(`recieved: ${message}`));
    ws.on('close', () => console.log('Client disconnected'));
});