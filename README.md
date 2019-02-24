# Boat Watch - Azure IoT Edge

Boat watch - this repository contains reference IoT Edge solution that watches boat and finds the boat classification types such as cruise, ferry, gondola, sail or kayak, etc. Not limited to it, it also includes the sending sensor data such as temperature, humidity, etc., stream analytics and azure functions.

This sample can be deployed in raspberry pi and also on an x64 machine/ simulator.

Check out this twitch stream to see development in action and join me on this voyage.

## Prerequisites

### Hardware

You can run this solution on either of the following hardware:

- **Raspberry Pi 3**: Set up Azure IoT Edge on a Raspberry Pi 3 and use the arm32v7 docker image tags.

- **Simulated Azure IoT Edge device**: Set up Azure IoT Edge and use the amd64 tags.

### Tooling

- **Visual Studio Code**: IoT Edge development environment. [Download it from here](https://code.visualstudio.com/)

- **Visual Studio Code: Azure IoT Edge Extension**: An [extension](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-edge) that connects to your IoT Hub and lets you manage your IoT Devices and IoT Edge Devices right from VS Code.

## Solution Architecture Diagram

[TBD]

## Custom Vision AI

The directory boat-classification-ml contains the exported pretrained model prediction code. 

The images of boat is uploaded to custom vision portal. The uploaded images are tagged by classification of boats and trained. The exported docker end point is running locally that takes in images and classifies them based on a custom model built.

## IoT Edge Solution

This iot-edge-solution will have different modules such as image capture, sensor modules. More modules will be added as we go forward.


