const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connexion', (socket) => {
	console.log('un nouvel arrivant!');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
