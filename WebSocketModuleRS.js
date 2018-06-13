//no logic passing data
const WebSocketServer = require('ws').Server;
const WemoSwitch = require('./WemoModuleRS');
const wss = new WebSocketServer({port: 3000});

//ws is an individual clients websocket
wss.on('connection',function(ws) {
  ws.send('connection made');
  ws.on('message', function (message) {
    console.log(message);
    if (message == 'discover'){
      WemoSwitch.discover();
    }

    //WemoSwitch.start(message);
  });
});
