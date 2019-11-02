import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarChartMaker from './bar_chart_maker';
import ChartHelper from './chart_helper'
import AllCallTypes from './metro/call_types'

import CallTypeSelection from './components/CallTypeSelection';

import PublicSafetyData_2018 from './output/2018-public-safety-logs.json'
import PublicSafetyData_2019 from './output/2019-public-safety-logs.json'

import AllPublicSafetData_2018 from './output/2018-full-log-info.json';
// console.log(PublicSafetyData_2018);

const DataRows_2018 = BarChartMaker(PublicSafetyData_2018, "FARE VIOLATION");
const DataRows_2019 = BarChartMaker(PublicSafetyData_2019, "FARE VIOLATION");


function App() {
  return (
    <div className="App">
      {/* <div style={{display:'flex', marginTop:20, width:'80%', margin:'auto'}}>
        <div style={{}}>
          <div style={{fontSize:'2em', padding:25}}>
            "Fare Violation" calls per week in 2018
          </div>
          {DataRows_2018}
        </div>

        <div style={{}}>
          <div style={{fontSize:'2em', padding:25}}>
            "Fare Violation" calls per week in 2019
          </div>
          <div>
            {DataRows_2019}
          </div>
          <br/>
          <div style={{clear:'both', marginTop:4, paddingLeft:45, float:'left', fontStyle:'italic'}}>(2019 isn't over yet, still 10 more bars to come)</div>
        </div>
      </div> */}

      <div id='SvgHolder'></div>

      <div 
        style={{width:800, margin:'10px auto', padding:'5px 0', backgroundColor:'blue', color:'white'}}
        onClick = { () => {
          ChartHelper.CreateTimeValuesChart('#SvgHolder', AllPublicSafetData_2018, ['FARE VIOLATION']);
        }}
      >Click me</div>

      <div style={{width:800, margin:'10px auto'}}>
        <CallTypeSelection id='CallTypeCheckboxes' />
      </div>

    </div>
  );
}

export default App;
