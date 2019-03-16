import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import Temperature from './sensor-widgets/temperature/Temperature';
import Pressure from './sensor-widgets/pressure/Pressure';
import Humidity from './sensor-widgets/humidity/Humidity';
import Wind from './sensor-widgets/wind/Wind';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'localhost:3001',
      temperature: '--',
      pressure: '--',
      humidity: '--',
      wind:  {
        speed: '--',
        direction: '--'
      },
      tagName: '',
      alert: false
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('sensorInput', (data) => {
       this.setState({
        temperature: parseFloat(data.machine.temperature).toFixed(2),
        pressure: parseFloat(data.machine.pressure).toFixed(2),
        humidity: parseFloat(data.ambient.humidity).toFixed(2),
        wind: {
          speed:  parseFloat(data.wind.speed).toFixed(2),
          direction: data.wind.direction
        }
       });
    });

    socket.on('cameraInput', (data) => {
       this.setState({ alert: true, tagName: data.tagName });
    });
  }

  handleClose () {
    this.setState({ alert: false });
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />  
        <div className="logo-container">
          <img src={logo}></img>
        </div>
        <Snackbar    
          open={this.state.alert}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.tagName}</span>}
        />
        <Grid container spacing="8" className="dashboard-container">
            <Grid>
                <Temperature temperature={this.state.temperature}></Temperature>
            </Grid>
            <Grid>
                <Pressure pressure={this.state.pressure}></Pressure>
            </Grid>
            <Grid>
                <Humidity humidity={this.state.humidity}></Humidity>
            </Grid>
            <Grid>
              <Wind wind={this.state.wind}></Wind>
            </Grid>
        </Grid>    
      </div>
    );
  }
}

export default App;
