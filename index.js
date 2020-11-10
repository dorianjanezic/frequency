//initializing the express 'sketch' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

let scoreBoard = {}; 

//initialize the HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("server is listening at port: " + port);
});

//initialize socket.io
let io = require('socket.io').listen(server);

//different nameSpaces
let mod = io.of('/mod');
let freq2 = io.of('/freq2');

//listening for users to connect
mod.on('connection', (socket) => {
    console.log('mod socket connected : ' + socket.id);

    socket.on('freqData', data => {

    
        console.log(data.freq);

        freq2.emit('freqData', data);
    });
});

freq2.on('connection', (socket) => {

    scoreBoard[socket.id]={};
    // console.log(scoreBoard);

    //getting username and score
    socket.on('clientObject', (data)=> {
        // I don't think we need to save this in an array
        // scoreBoard[socket.id].name = data.name;
        // scoreBoard[socket.id].score = data.score;

        //sending name and score back to nameSpace '/freq2'
        // socket.emit('scoreBoard', scoreBoard);
        freq2.emit('scoreBoard', data);
        console.log(data);
    });
});


