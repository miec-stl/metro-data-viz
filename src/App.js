import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarChartMaker from './bar_chart_maker';

import PublicSafetyData_2018 from './output/2018-public-safety-logs.json'
// console.log(PublicSafetyData_2018);

const DataRows_2018 = BarChartMaker(PublicSafetyData_2018, "FARE VIOLATION");

function App() {
  return (
    <div className="App">
      <div style={{fontSize:'2em', padding:5}}>
        "Fare Violation" calls per week in 2018
      </div>
      {DataRows_2018}
    </div>
  );
}

export default App;
