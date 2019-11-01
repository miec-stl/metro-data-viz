import React from "react";
import _ from "underscore";
import * as d3 from 'd3';

const ChartHelper = {    

    CreateCallTypeButtons: (CallTypes) => {

        const ButtonDivs = _.map(CallTypes, (CallType) => {
            let CallTypeDisplayText = CallType.toLowerCase();
            return <label label={CallType} key={CallType}>
                <input type='checkbox' value={CallType} id={CallType} />
                <span style={{textTransform:'capitalize'}}>{CallTypeDisplayText}</span>
            </label>
        });

        return <div id='CallTypeCheckboxes'>
            {ButtonDivs}
        </div>;
    }
}

export default ChartHelper