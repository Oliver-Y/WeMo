function turn(request){
  var Wemo = require('wemo-client');
  var wemo = new Wemo();
  wemo.discover(function(err, deviceInfo) {
    console.log('Wemo Device Found: %j', deviceInfo.friendlyName);
    var client = wemo.client(deviceInfo);
    client.on('error', function(err) {
      console.log('Error: %s', err.code);
    });
    //Parse this into
    client.on('binaryState', function(value) {
       console.log('Binary State changed to: %s', value);
    });

    if (request == 'on'){
      client.setBinaryState(1);
    }

    else if (request == 'off'){
      client.setBinaryState(0);
    }
  });
}
module.exports.turn = turn;
console.log(module);
//turnOn('on');
//turnOn('off');
