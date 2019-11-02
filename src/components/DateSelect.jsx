import React, { Component } from 'react';
import moment from 'moment';

class DateSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DateValue:this.props.Default,
            ValidDate:true
        }
    }

    HandleOnChange = (evt) => {
        const EnteredValue = evt.target.value;
        const IsValidDate = moment(EnteredValue, 'YYYY-MM-DD', true).isValid();
        this.setState({ValidDate:IsValidDate, DateValue:EnteredValue}, () => {
            this.props.OnUpdateFunc(this.props.Type, (IsValidDate ? EnteredValue : false));
        });
    }

    render() {
        const InputStyle = {backgroundColor: (this.state.ValidDate ? "white" : "red"), color: (this.state.ValidDate ? "black" : "white")};    
        return <div style={{padding:'2px 10px'}}>
            <span>{this.props.Type}: </span>
            <input type="text" onChange={this.HandleOnChange} value={this.state.DateValue} style={InputStyle} />
        </div>
    }
}

export default DateSelect;