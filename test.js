var Wemo = require('wemo-client');
var wemo = new Wemo();
wemo.discover(function(err, deviceInfo) {
  console.log('Wemo Device Found: %j', deviceInfo.friendlyName);
  var client = wemo.client(deviceInfo);
  client.on('error', function(err) {
    console.log('Error: %s', err.code);
  });
  client.on('binaryState', function(value) {
     console.log('Binary State changed to: %s', value);
  });
  client.setBinaryState(1);
});
