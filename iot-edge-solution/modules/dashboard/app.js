'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static('public'));

app.get('/healthcheck', (req, res, next) => {
  res.status(200).send({ 'status': 'healthy' });
});

server.listen(process.env.PORT || 3001, () => console.log('Server is running...'));

io.on('connection', (socket) => {
   console.log('Client connected');
});

Client.fromEnvironment(Transport, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    // connect to the Edge instance
    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');

        client.on('inputMessage', function (inputName, msg) {
          if(inputName === 'sensorInput') {
            const data =  JSON.parse(msg.getBytes().toString('utf8'));
            console.log(data);
            io.sockets.emit('sensorInput', data);
          } else if(inputName === 'cameraInput') {
            const data =  JSON.parse(msg.getBytes().toString('utf8'));
            console.log(data);
            io.sockets.emit('cameraInput', data);
          }
        });
      }
    });
  }
});

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    }
    if (res) {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}
