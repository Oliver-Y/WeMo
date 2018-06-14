const WebSocketServer = require('ws').Server;
const WemoSwitch = require('./WemoModuleRS');
const wss = new WebSocketServer({port: 3000});
var WemoEm = WemoSwitch.listener;
//Will be replaced when used in Scratch Client
var userList = undefined;

function parseDevice(message) {
  var whs1 = message.indexOf(' ');
  var whs2 = message.lastIndexOf(' ');
  return message.substring(whs1+1,whs2);
}

function parseRequest(message) {
  return message.substr(message.lastIndexOf(' ')+1);
}

wss.on('connection',function(ws) {
  ws.send('connection made');
  ws.on('message', function (message) {

    WemoEm.on('devices', function(userlist) {
        userList = userlist;
      })

    WemoEm.on('read',function(state) {
        ws.send(state);
      })

    if (message == 'discover') {
      WemoSwitch.discover();
    }
    else if (message.includes('select')) {
      var device = parseDevice(message);
      var request = parseRequest(message);
      WemoSwitch.logic(request,userList[device])
    }
  });
});
