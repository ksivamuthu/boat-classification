import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
import Button from '@material-ui/core/Button';
import Temperature from './sensor-widgets/temperature/Temperature';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'localhost:3001',
      temperature: '10'
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('temperatureInput', (data) => {
       this.setState({ temperature: data.temperature });
    });
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />  
        <div className="logo-container">
          <img src={logo}></img>
        </div>
        <div className="dashboard-container">
            <Temperature temperature={this.state.temperature}></Temperature>
        </div>    
      </div>
    );
  }
}

export default App;
