/*

    Liam Workman
    App.js
    Basic react component that builds out the widget.

*/

import React, { Component } from 'react';
import './App.css';
import CalendarWidget from './containers/calendar-widget.js';

class App extends Component {
  render() {
    return (
      <CalendarWidget/>
    );
  }
}

export default App;
