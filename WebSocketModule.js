const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 3000});
const WemoSwitch = require('./WemoModule');

//ws is an individual clients websocket
wss.on('connection',function(ws) {
  ws.send('connection made');
  ws.on('message', function (message) {
    console.log(message);
    WemoSwitch.turn(message);
  });
});
