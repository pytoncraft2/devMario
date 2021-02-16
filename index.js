const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('saut', function() {
   console.log('saut de malade'); 
  });

});


/*
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

chat
*/
io.on('connection', (socket) => {
  socket.on('initializeplayer', () => {
    console.log('test');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
