import React, { Component } from 'react';
import _ from 'underscore';

import CallTypeCheckbox from './CallTypeCheckbox';

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
    constructor(props) {
        super(props);
        this.state = {CurrentlyChecked:this.props.DefaultChecked};
    }

    static defaultProps = {
        CallTypes: DefaultCallTypes,
        DefaultChecked: ['FARE VIOLATION']
    }

    HandleChildChange = (ChangedCallType, NewStatus) => {
        let CheckedTypes = this.state.CurrentlyChecked;
        if(NewStatus) {
            // Type was added
            CheckedTypes.push(ChangedCallType);
        } else {
            // Type was removed
            let IndexToRemove = this.state.CurrentlyChecked.indexOf(ChangedCallType);
            CheckedTypes.splice(IndexToRemove, 1);
        }   
        this.setState({CurrentlyChecked:CheckedTypes});
        this.props.OnChangeFunc(this.state.CurrentlyChecked);
        this.render();
    }

    render() {

        const AllCallTypes = this.props.CallTypes;
        const CallTypeCheckboxes = _.map(AllCallTypes, (ThisCallType) => {
            return <CallTypeCheckbox CallType={ThisCallType} key={ThisCallType} CheckedStatus={_.contains(this.state.CurrentlyChecked, ThisCallType) ? true : false} OnChangeFunc={this.HandleChildChange} />
        }, this)

        return <div id={this.props.id}>
            {CallTypeCheckboxes}
        </div>;
    }
}

export default CallTypeSelection;