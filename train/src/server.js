var ws = require('ws').Server;

var server = new ws({
    host: "127.0.0.1",
    port: 8090
});
server.on('connection', function(ws) {
    console.log('connected!');
    ws.on('message', function(message) {
        console.log(message.toString());
    });

    ws.on('close', function() {
        console.log("disconnected...");
    });
});

console.log('websockect-server running...');