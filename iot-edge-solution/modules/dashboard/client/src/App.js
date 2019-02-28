import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.temperature}</p>
        </header>
      </div>
    );
  }
}

export default App;
