# WeMo
WeMo and other IOT 
Connecting Scratch Via Websocket to Serverside JS to control WEMO devices

# Commands
Discover: searches for all Wemo devices in the area. Has to be done before actual commands can be issued 
On: Turns selected Wemo device on
Off: Turns selected Wemo device off
Read: Reads the binary state of the selected Wemo device

# String Format
To scan the area for all Wemo's, simply type discover

In order to turn the Wemo on and off, the string has to be formatted as: select (Wemo friendly name) (request) 
For ex: select Wemo Mini on || select Wemo Mini off || select Wemo Mini read


