'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;

const simulatedParams = {
  machineTempMin: 21,
  machineTempMax: 100,
  machinePressureMin: 1,
  machinePressureMax: 10,
  ambientTemp: 21,
  humidityPercent: 25
};

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

        sendSimulatedData(client);         
      }
    });
  }
});


const windDirections = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'];

function sendSimulatedData(client) {
   var currentTemp = simulatedParams.machineTempMin;
   var normal = (simulatedParams.machinePressureMax - simulatedParams.machinePressureMin) / (simulatedParams.machineTempMax - simulatedParams.machineTempMin);

   setInterval(() => {
      if(currentTemp > simulatedParams.machineTempMax) {
        currentTemp += Math.random() - 0.5;
      } else {
        currentTemp += -0.25 + (Math.random() * 1.5);
      }

      var data =  {
        machine: {
          temperature: currentTemp,
          pressure: simulatedParams.machinePressureMin + ((currentTemp - simulatedParams.machineTempMin) * normal)
        },
        ambient: {
          temperature: simulatedParams.ambientTemp + Math.random() - 0.5,
          humidity: randomFromInterval(24, 27)
        },
        wind: {
          direction: windDirections[Math.round(randomFromInterval(0,7))],
          speed: randomFromInterval(3,20)
        }
      };

      console.log(data);

      var msg = new Message(JSON.stringify(data));
      client.sendOutputEvent('sensor', msg, printResultFor('Sending sensor message'));
   }, 3000);
}

function randomFromInterval(min, max) // min and max included
{
    return Math.random()*(max-min+1)+min;
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
