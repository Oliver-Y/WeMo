//no logic passing data
const WebSocketServer = require('ws').Server;
const WemoSwitch = require('./WemoModuleRS');
const wss = new WebSocketServer({port: 3000});
var WemoEm = WemoSwitch.listener;

//ws is an individual clients websocket
wss.on('connection',function(ws) {
  ws.send('connection made');
  ws.on('message', function (message) {
    WemoEm.on('device', function(user) {
        console.log("device listener");
        console.log(user);
        user.logic(message)
      })
    WemoEm.on('read',function(state){
        console.log("read listsner");
        ws.send(state);
      })
    if (message == 'discover'){
      WemoSwitch.discover();
    }
    //WemoSwitch.start(message);
  });
});
