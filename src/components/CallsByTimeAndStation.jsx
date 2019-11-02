import React, { Component } from 'react';
import _ from 'underscore';
import ChartHelper from '../chart_helper'

// Components
import CallTypeSelection from './CallTypeSelection';
import DateSelect from './DateSelect'

// Data
import AllCallTypes from '../metro/call_types'
import AllPublicSafetyData_2017 from '../output/2017-full-log-info.json';
import AllPublicSafetyData_2018 from '../output/2018-full-log-info.json';
import AllPublicSafetyData_2019 from '../output/2019-full-log-info.json';

const AllPublicSafetyData = AllPublicSafetyData_2017.concat(AllPublicSafetyData_2018, AllPublicSafetyData_2019);

class CallsByTimeAndStation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CallTypesToDisplay:this.props.DefaultCallTypes,
            StartDate:this.props.DefaultStart,
            EndDate:this.props.DefaultEnd,
            ReadyForUpdate:false
        };
    }
    
    static defaultProps = {
        SvgHolderId: 'SvgHolder',
        CheckboxContainerId: 'CallTypeCheckboxes',
        DefaultCallTypes: ['FARE VIOLATION'],
        DefaultStart:'2019-01-01', 
        DefaultEnd:'2019-09-30'
    }

    componentDidMount() {
        this.UpdateTimeValuesChart();
    }

    GetDataInDateRange = (StartDate, EndDate) => {
        return _.filter(AllPublicSafetyData, (Row) => {
            if(Row.Time > StartDate && Row.Time < EndDate) {
                return true;
            } else {
                return false;
            }
        });
    }

    UpdateDateRange = (DateType, NewValue) => {
        this.setState(_.object([[DateType, NewValue], ['ReadyForUpdate', true]]));
        
    }

    UpdateCallTypes = (NewCurrentlyChecked) => {
        console.log(NewCurrentlyChecked);
        this.setState({CallTypesToDisplay:NewCurrentlyChecked}, () => {
            this.UpdateTimeValuesChart();
        });
    }

    UpdateTimeValuesChart = () => {
        console.log(this.state);
        if(this.state.StartDate && this.state.EndDate) {
            
            ChartHelper.CreateTimeValuesChart(
                "#"+this.props.SvgHolderId, 
                this.GetDataInDateRange(this.state.StartDate, this.state.EndDate), 
                this.state.CallTypesToDisplay
            );
            this.setState({ReadyForUpdate:false}, () => { this.render(); })
        }
    }
    
    render() {
        const DateSelectBoxStyle ={width:800, margin:'10px auto', padding:'10px 0', display:'flex', justifyContent:'center', backgroundColor:'orange'}
        const CheckboxContainerStyle = {width:800, margin:'10px auto'};
        const UpdateButtonStyle = {padding:'1px 10px', backgroundColor:'orange', color:'orange'};
        if(this.state.ReadyForUpdate) {
            UpdateButtonStyle['backgroundColor'] = 'white';
            UpdateButtonStyle['color'] = 'blue';
            UpdateButtonStyle['cursor'] = 'pointer';
        }

        return <div>
            <div id={this.props.SvgHolderId}>{/* Empty, will get filled by D3*/}</div>

            <div style={DateSelectBoxStyle}>
                <DateSelect Type='StartDate' Default={this.props.DefaultStart} OnUpdateFunc={this.UpdateDateRange}/>
                <DateSelect Type='EndDate' Default={this.props.DefaultEnd} OnUpdateFunc={this.UpdateDateRange}/>
                <div style={UpdateButtonStyle} onClick={this.UpdateTimeValuesChart}>Update</div>
            </div>

            <div style={CheckboxContainerStyle}>
                <CallTypeSelection id={this.props.CheckboxContainerId} OnChangeFunc={this.UpdateCallTypes} CallTypes={AllCallTypes}/>
            </div>
        </div>

    }
}

export default CallsByTimeAndStation;