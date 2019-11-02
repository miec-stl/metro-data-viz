import React, { Component } from 'react';
import _ from 'underscore';

const DefaultCallTypes = [
    'FARE VIOLATION',
    'FARE DISPUTE',
    'SICK CASE',
    'DRUG VIOLATION',
    'SMOKING ON TRAIN',
    'SLEEPER',
    'ARREST',
    'DISTURBANCE',
    'INTOXICATED SUBJECT',
    'THEFT',
    'PUBLIC URINATION'
]

class CallTypeSelection extends Component {
    static defaultProps = {
        CallTypes: DefaultCallTypes
    }

    render() {
        const CapitalizeStyle = {textTransform:'capitalize'};

        const AllCallTypes = this.props.CallTypes;
        const CallTypeCheckboxes = _.map(AllCallTypes, (ThisCallType) => {
            const CallTypeDisplayText = ThisCallType.toLowerCase();
            return <label label={ThisCallType} key={ThisCallType}>
                <input type='checkbox' value={ThisCallType} />
                <span style={CapitalizeStyle}>{CallTypeDisplayText}</span>
            </label>
        })

        return <div id={this.props.id}>
            {CallTypeCheckboxes}
        </div>;
    }
}

export default CallTypeSelection;