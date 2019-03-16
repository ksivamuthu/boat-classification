'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;
var request = require('request');
var fs = require('fs');
var path = require('path');
var IMAGE_CLASSIFIER_URL = "http://boatclassifier:80/image"

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
          var index = randomIndex(0, 41);
          classifyImage(client, index);
        }, 10000);
      }
    });
  }
});

function randomIndex(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function classifyImage(client, index) {
  var stream = fs.readFileSync(path.join(__dirname, 'data', `IMG${index}.jpg`));
  
  var options =  { 
    followAllRedirects: true,
    body: stream, 
    headers: { 'Content-Type': 'application/octet-stream' } 
  };

  request.post(IMAGE_CLASSIFIER_URL, options, (err, res) => {
    var result = JSON.parse(res.body);
    var predictions = result.predictions;
    if(predictions && predictions.length > 0) {
        var maxScore = 0;
        var tagName = '';
        for(var i = 0; i <= predictions.length - 1; i++) {
          if(maxScore <= predictions[i].probability) {
            maxScore = predictions[i].probability;
            tagName = predictions[i].tagName;
          }
        }
        var data = {
          maxScore: maxScore,
          tagName: tagName
        };
        var msg = new Message(JSON.stringify(data));
        client.sendOutputEvent('camera', msg);
    }
  });
}