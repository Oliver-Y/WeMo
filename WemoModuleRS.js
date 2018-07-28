var Wemo = require('wemo-client');
var wemo = new Wemo();
//Global scope variables.
/*class Wemo{
  constructor(){
    this._state = 0;
  }
}*/

var Client = module.exports = function(opts) {
  opts = opts || {};
  this.clientList = {};

};

Client.prototype.turnOn = function(user) {
  this.clientList[user].setBinaryState(1);
};

Client.prototype.turnOff = function(user) {
  this.clientList[user].setBinaryState(0);
};

Client.prototype.toggle = function(user) {
  this.clientList[user].setBinaryState(1);
  setTimeout(this.turnOff(user),10000);
}

Client.prototype.read = function(user) {
    this._readListener(this.state);
};
//Scope of the things.
Client.prototype.discover = function() {
  wemo.discover((err,deviceInfo) => {
    console.log('Wemo Device Found: %j', deviceInfo.friendlyName);
    var client = wemo.client(deviceInfo);
    client.on('error', function(err) {
      console.log('Error: %s', err.code);
    });
    client.on('binaryState', (value) => {
      this.state = value;
      this._readListener(value);
    })
    this.clientList[client.device.friendlyName] = client;
    this._deviceListener(this.clientList);
  });
  //Update client list
};

Client.prototype.logic = function(request,user) {
  if(this.clientList[user] == undefined) {
    console.log('undefined user')
  } else {
    if (request == 'on'){
      this.turnOn(user);
    } else if (request == 'off'){
    this.turnOff(user);
    } else if (request == 'read'){
       this.read(user);
     }
     else if (request == 'toggle'){
       this.toggle(user);
     }
  }
};

Client.prototype.createDiscoverListener = function(cb) {
  this._deviceListener = cb;
};

Client.prototype.createReadListener = function(cb) {
  this._readListener = cb;
};


/*
//Class for client information
class Client {
  constructor() {
  }

  turnOn(name) {
    this.clientList[name].setBinaryState(1);
  }

  turnOff(name) {
    this.clientList[name].setBinaryState(0);
  }

  read(name) {
        this.clientList[name].getBinaryState(function(err,state) {
        //Callback to send it back up.
        this._readListener(state);
      })
    }

  discover() {
      wemo.discover(function(err, deviceInfo) {
        console.log('Wemo Device Found: %j', deviceInfo.friendlyName);
        var client = wemo.client(deviceInfo);
        client.on('error', function(err) {
           console.log('Error: %s', err.code);
         })
        this.clientList[client.device.friendlyName] = client;
        //Callback when clienstList is found
        this._deviceListener(this.clientList);
        //eventEmitter.emit('devices',clientList);
        })
      }

  logic(request,user){
        console.log(clientList);
        if(clientList[user] == undefined) {
          console.log('undefined user')
        }

        else {
          if (request == 'on'){
            this.clientList[user].turnOn();
          }
        else if (request == 'off'){
          this.clientList[user].turnOff();
          }
        else if (request == 'read'){
             this.clientList[user].read();
           }
        }
      }

      createDiscoverlistener(cb){
        this._deviceListener = cb;
      }

      createReadListener(cb){
        this._readListener = cb;
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
  //Catching undefined users
  console.log(clientList);
  if(clientList[user] == undefined) {
    console.log('undefined user')
  }

  else {
    if (request == 'on'){
      clientList[user].turnOn();
    }
  else if (request == 'off'){
    clientList[user].turnOff();
    }
  else if (request == 'read'){
       clientList[user].read();
     }
  }


}
*/
