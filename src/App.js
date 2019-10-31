import React from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'underscore';


import PublicSafetyData_2018 from './output/2018-public-safety-logs.json'
// console.log(PublicSafetyData_2018);

const DataRows = _.map(PublicSafetyData_2018, (Value, Key) => {
  return <div key={Key}>
    <h2>{Key}</h2>
    <div>
      {_.map(Value, (NumCalls, CallType) => {
        return <div key = {Key+CallType}>
          <span style={{weight:'bold'}}>{CallType}:</span>
          <span>{NumCalls}</span>
        </div>
      })}
    </div>
  </div>
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {DataRows}
      </header>
    </div>
  );
}

export default App;
