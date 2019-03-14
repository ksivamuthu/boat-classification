'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;
var request = require('request');
var fs = require('fs');
var path = require('path');

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

        setInterval(() => {
          classifyImage();
        }, 5000);
      }
    });
  }
});
var IMAGE_CLASSIFIER_URL = "http://boatclassifier:80/image"
function classifyImage() {
  var stream = fs.readFileSync(path.join(__dirname, 'test.jpg'));
  request.post(IMAGE_CLASSIFIER_URL, { 
    followAllRedirects: true,
    body: stream, 
    headers: { 'Content-Type': 'application/octet-stream' 
  }}, (err, res) => {
    console.log(err, res.toJSON());
  });
}

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
