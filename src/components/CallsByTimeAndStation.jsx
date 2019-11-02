import React, { Component } from 'react';
import Moment from 'moment';
import _ from 'underscore';
import ChartHelper from '../chart_helper'

// Components
import CallTypeSelection from './CallTypeSelection';
import DateSelect from './DateSelect'

// Data
import AllPublicSafetyData_2017 from '../output/2017-full-log-info.json';
import AllPublicSafetyData_2018 from '../output/2018-full-log-info.json';
import AllPublicSafetyData_2019 from '../output/2019-full-log-info.json';

const AllPublicSafetyData = AllPublicSafetyData_2017.concat(AllPublicSafetyData_2018, AllPublicSafetyData_2019);

class CallsByTimeAndStation extends React.Component {
    constructor(props) {
        super(props);
    }
    
    static defaultProps = {
        SvgHolderId: 'SvgHolder',
        CheckboxContainerId: 'CallTypeCheckboxes',
        CallTypesToDisplay: ['FARE VIOLATION'],
        DefaultStart:'2019-01-01', 
        DefaultEnd:'2019-09-30'
    }

    GetDataInDateRange = (StartDate, EndDate) => {
        console.log(StartDate);
        console.log(EndDate);
        return _.filter(AllPublicSafetyData, (Row) => {
            if(Row.Time > StartDate && Row.Time < EndDate) {
                return true;
            } else {
                return false;
            }
        });
    }

    UpdateTimeValuesChart = () => {
        ChartHelper.CreateTimeValuesChart(
            "#"+this.props.SvgHolderId, 
            this.GetDataInDateRange(this.props.DefaultStart, this.props.DefaultEnd), 
            this.props.CallTypesToDisplay
        );
    }
    
    render() {
        // console.log(AllPublicSafetyData);
        const ClickButtonStyle = {width:800, margin:'10px auto', padding:'5px 0', backgroundColor:'blue', color:'white'};
        const DateSelectBoxStyle ={width:800, margin:'10px auto', padding:'5px 0', display:'flex', justifyContent:'center', backgroundColor:'orange'}
        const CheckboxContainerStyle = {width:800, margin:'10px auto'};

        return <div>
            <div id={this.props.SvgHolderId}>{/* Empty, will get filled by D3*/}</div>

            <div style={ClickButtonStyle} onClick={this.UpdateTimeValuesChart}>
                Click me
            </div>

            <div style={DateSelectBoxStyle}>
                <DateSelect Type='StartDate' Default={this.props.DefaultStart}/>
                <DateSelect Type='EndDate' Default={this.props.DefaultEnd}/>
            </div>

            <div style={CheckboxContainerStyle}>
                <CallTypeSelection id={this.props.CheckboxContainerId} />
            </div>
        </div>

    }
}

export default CallsByTimeAndStation;