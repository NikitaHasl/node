const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path')

const users = [];
const server = http.createServer((req, res)=>{
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res);
})

const io = socket(server);

io.on('connection', (client)=>{
    const name = client.handshake.headers.username
    users.push(name);
    client.emit('newConnection', {
        "newUser": client.handshake.headers.username,
        "users": users,
    });
    client.broadcast.emit('newConnection', {
        "newUser": client.handshake.headers.username,
        "users": users,
    });
    client.on('clientMessage', (data)=>{
        client.broadcast.emit('serverMsg', data);
        client.emit('serverMsg', data);
    })

    client.on('disconnecting', (reason)=>{
        let indexNameUser = users.indexOf(name)
        users.splice(indexNameUser, 1);
        client.broadcast.emit('userDisconnect', {
            "user": name,
            "users": users,
        });
    })
})



server.listen(80);