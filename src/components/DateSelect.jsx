import React, { Component } from 'react';

class DateSelect extends React.Component {
    
    HandleOnChange = (evt) => {
        console.log(evt);
    }

    render() {
        
        return <div style={{padding:'2px 10px'}}>
            <span>{this.props.Type}: </span>
            <input type="text" onChange={this.HandleOnChange} value={this.props.Default} />
        </div>
    }
}

export default DateSelect;