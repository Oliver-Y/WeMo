var Wemo = require('wemo-client');
var state = -1;
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
//Listener--> Search up how to set up a Listener. 
function startListener(cb){

}

function discover() {
  var wemo = new Wemo();
  //Listening for Wemo Devices
  wemo.discover(function(err, deviceInfo) {
    console.log('Wemo Device Found: %j', deviceInfo.friendlyName);
    var client = wemo.client(deviceInfo);
    var user = new Client(deviceInfo,client);
    clientList[user.client.friendlyName] = user;

  //Some input to deteremine some sort of request or change the request
function logic(request)
  if (request == 'on'){
    user.turnOn();
  }
  else if (request == 'off'){
    user.turnOff();
  }
  else if (request == 'read'){
    state = user.read();
  }

  //Error handling
  client.on('error', function(err) {
    console.log('Error: %s', err.code);
  })
  });
}

module.exports.start = start;
module.exports.state = state;
console.log(module);
//turnOn('on');
//turnOn('off');
