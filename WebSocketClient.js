var ws = new WebSocket("ws://localhost:3000");
//Send information
exampleSocket.onopen = function (event) {
  //Prompt for information
  exampleSocket.send(event);
};
