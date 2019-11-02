import React, { Component } from 'react';

class CallTypeCheckbox extends Component {

    static defaultProps = {
        CheckedStatus: false,
        OnChangeFunc: () => { console.error('No OnChangeFunction'); }
    }

    ClickBox = (evt) => {
        evt.preventDefault();
        const { CallType, CheckedStatus } = this.props;
        this.props.OnChangeFunc(CallType, !CheckedStatus);
    }
    
    render() {
        const CapitalizeStyle = {textTransform:'capitalize'};
        const ThisCallType = this.props.CallType;
        const CallTypeDisplayText = ThisCallType.toLowerCase();

        let BoxStyle;
        if (this.props.CheckedStatus) {
            BoxStyle = {backgroundColor:'black'};
        } else {
            BoxStyle = {backgroundColor:'#999'};
        }    

        return <label label={ThisCallType} onClick={this.ClickBox} style={BoxStyle}>
            <input type='checkbox' value={ThisCallType} checked={this.props.CheckedStatus} onChange={(evt) => {evt.preventDefault();} }/>
            <span style={CapitalizeStyle}>{CallTypeDisplayText}</span> 
        </label>;
    }
}

export default CallTypeCheckbox;