window.onload = function (){
var button = document.getElementById('button');
var msg = '';
var ws = new WebSocket("ws://localhost:3000");
button.addEventListener('click',function()
{
    console.log();
//    ws.send(document.getElemtnByID('input'));
})
}
