var input = document.getElementById('input');
var msg = '';
var ws = new WebSocket("ws://localhost:3000");
ws.onopen = function (event) {
  input.addEventListener('click',function()
  {
    alert('ur message has been sent');
    ws.send(input.value);
  })
};
