var Wemo = require('wemo-client');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var clientList = {};

class Client {
  constructor(deviceInfo,client){
    //still not sure about the relationship
    //between client + device info so I pass both for now.
    this.deviceInfo == deviceInfo;
    this.client = client;
    }
  turnOn(){
    this.client.setBinaryState(1);
  }
  turnOff(){
    this.client.deviceInfo.setBinaryState(0);
  }
  read() {
      this.client.on('binaryState', function(value) {
         console.log('Binary State changed to: %s', value);
         return value;
       });
    }
  }

function discover() {
  var wemo = new Wemo();
  //Listening for Wemo Devices
  wemo.discover(function(err, deviceInfo) {
    //Listener for errors
    client.on('error', function(err) {
      console.log('Error: %s', err.code);
    })
    console.log('Wemo Device Found: %j', deviceInfo.friendlyName);
    var client = wemo.client(deviceInfo);
    var user = new Client(deviceInfo,client);
    clientList[user.client.friendlyName] = user;
    eventEmitter.emit('device',user);
    })
  console.log("no devices are found");
  }

function logic(request){
  if (request == 'on'){
    user.turnOn();
  }
  else if (request == 'off'){
    user.turnOff();
  }
  else if (request == 'read'){
    state = user.read();
    eventEmitter.emit('read',state);
  }
}

//Exports
module.exports.logic = logic;
module.exports.discover = discover;
module.exports.listener = eventEmitter;
