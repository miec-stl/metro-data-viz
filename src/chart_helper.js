import _ from "underscore";
import $ from 'jquery';
import * as d3 from 'd3';
import Moment from 'moment';
import MetrolinkStations from './metro/metrolink_stations';

const ChartHelper = {   
    
    GetCallTypes: () => {
        let CheckedCallTypes = $('#CallTypeCheckboxes input:checked').map(function() {
            console.log(this);
            return $(this).parent().text()
        });
        
        return CheckedCallTypes;
    },
    
    CreateTimeValuesChart: (DivSelector, Data, CallsToCount) => {
        let Width = 780;
        let Height = 750;

        let ChartSvg = d3.select(DivSelector)
                .html("")
                .append('svg')
                .attr('width', Width)
                .attr('height', Height)
                // .data(Data);

        ChartSvg.selectAll('text.timeLabel')
                .data(['4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm', '12am', '2am'])
                .enter()
                .append('text')
                .attr('class', 'timeLabel')
                .text(function(d, i) {
                  return d;
                })
                .attr("x", function(d, i) {
                  return i * ((Width - 160) / 12) + 180;
                })
                .attr("y", Height - 10)
                .attr("text-anchor", "middle");

        ChartSvg.selectAll('text.stationLabel')
                .data(MetrolinkStations.AllStations)
                .enter()
                .append('text')
                .attr('class', 'stationLabel')
                .text(function(d, i) {
                  return d;
                })
                .attr("x", 160)
                .attr("y", function(d, i) {
                  return ((Height - 40) / MetrolinkStations.AllStations.length) * i + 10;
                })
                .attr('text-anchor', 'end')
                .attr('fill', function(d, i) {
                  if(_.contains(MetrolinkStations.RedStations, d)) {
                    return 'red';
                  } else if(_.contains(MetrolinkStations.BlueStations, d)) {
                    return 'blue';
                  } else {
                    return 'black';
                  }
        });

        const MetrolinkCalls = _.where(Data, {Category:"METROLINK"});
        const SelectedMetrolinkCalls = _.filter(MetrolinkCalls, (Row) => {
            return _.contains(CallsToCount, Row.CallType);
        });

        const CapitalizedStationNames = _.map(MetrolinkStations.AllStations, (ThisStation) => { return ThisStation.toUpperCase(); });
        const CallsByStation = _.groupBy(
            SelectedMetrolinkCalls, 
            (ThisCall) => {
                return _.find(CapitalizedStationNames, (ThisStation) => {
                    if (ThisCall.Location.indexOf(ThisStation) != -1) { return true; } else {
                        // console.error(ThisCall.Location)
                    }
                });
            }
        );

        console.log(CallsByStation);


        _.each(CallsByStation, function(CallsAtStation, StationName) {
        
            ChartSvg.selectAll('svg')
              .data(CallsAtStation)
              .enter()
              .append('circle')
              .attr('class', 'CallCircle')
              .attr("cx", function(d, i) {
                let MomentDate = new Moment(d.Time)
                var TimeInt = MomentDate.hour() - 3;
                if (TimeInt < 0) {
                  TimeInt = 24 + TimeInt;
                }
                TimeInt = TimeInt + MomentDate.minutes() / 60;
                return TimeInt/2 * (Width - 160)/12 + 180;
              })
              .attr("cy", function (d, i) {
                var StationIndex = _.indexOf(_.map(MetrolinkStations.AllStations, (Station) => {return Station.toUpperCase();}), StationName);
                return ((Height - 40) / MetrolinkStations.AllStations.length) * StationIndex + 10 - 4;
              })
              .attr("r", 4)
              .attr('fill', 'red')
              .attr('opacity', 0.3);
          });
    }
}

export default ChartHelper