const WebSocketServer = require('ws').Server;
var Client = require('./WemoModuleRS');
var Wemo_Client = new Client();
const wss = new WebSocketServer({port: 3000});

function parseDevice(message) {
  var space = message.lastIndexOf(' ');
  return message.substring(0,space);
}

function parseRequest(message) {
  return message.substr(message.lastIndexOf(' ')+1);
}

wss.on('connection',function(ws) {
  ws.send('connection made');
  Wemo_Client.createDiscoverListener(function(clientList){
    ws.send(Object.keys(clientList));
  });
  Wemo_Client.createReadListener(function(state){
    ws.send(state);
  });
  ws.on('message', function (message) {
    if (message == 'discover') {
      Wemo_Client.discover();
    }
    else  {
      var trim_msg = message.trim();
      var device = parseDevice(trim_msg);
      var request = parseRequest(trim_msg);
      Wemo_Client.logic(request,device)
    }
  });
});



/*WemoEm.on('devices', function(userlist) {
    ws.send(Object.keys(userlist));
  })*/

/*WemoEm.once('read',function(state) {
    ws.send(state);
  })*/
