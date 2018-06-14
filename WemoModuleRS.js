var Wemo = require('wemo-client');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var wemo = new Wemo();
var clientList = {};

//Class for client information
class Client {
  constructor(client) {
    this.client = client;
  }
  turnOn() {
    this.client.setBinaryState(1);
  }
  turnOff() {
    this.client.setBinaryState(0);
  }
  read() {
      this.client.getBinaryState(function(err,state) {
        eventEmitter.emit('read',state);
      })
    }
  }

//Finding all devices and placed in clientList
function discover() {
  wemo.discover(function(err, deviceInfo) {
    console.log('Wemo Device Found: %j', deviceInfo.friendlyName);
    var client = wemo.client(deviceInfo);
    client.on('error', function(err) {
       console.log('Error: %s', err.code);
     })
    var user = new Client(client);
    clientList[user.client.device.friendlyName] = user;
    eventEmitter.emit('devices',clientList);
    })
  }

//Logic for determining requests
function logic(request,user){
  if (request == 'on'){
    user.turnOn();
  }
  else if (request == 'off'){
    user.turnOff();
  }
  else if (request == 'read'){
    user.read();
  }
}

//Exports
module.exports.logic = logic;
module.exports.discover = discover;
module.exports.listener = eventEmitter;
