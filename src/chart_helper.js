import _ from "underscore";
import $ from 'jquery';
import * as d3 from 'd3';
import Moment from 'moment';
import MetrolinkStations from './metro/metrolink_stations';
import CallsByTimeAndStation from "./components/CallsByTimeAndStation";

const ChartHelper = {   
    
    GetCallTypes: () => {
        let CheckedCallTypes = $('#CallTypeCheckboxes input:checked').map(function() {
            console.log(this);
            return $(this).parent().text()
        });
        
        return CheckedCallTypes;
    },

    AddTimeLabels: (ChartSvg) => {
      ChartSvg.selectAll('text.timeLabel')
        .data(['4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm', '12am', '2am'])
        .enter()
        .append('text')
        .attr('class', 'timeLabel')
        .text(function(d, i) {
          return d;
        })
        .attr("x", function(d, i) {
          return i * ((Width - 180) / 12) + 180;
        })
        .attr("y", Height - 10)
        .attr("text-anchor", "middle");
    },

    AddStationLabels: (ChartSvg) => {
      ChartSvg.selectAll('text.stationLabel')
        .data(Metrolink.AllStations)
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
    },

    AddCallsForStation: (ChartSvg, StationName, CallsAtStation) => {
      ChartSvg.selectAll('svg')
        .append('text')
        .text(_.size(CallsAtStation))
        .attr("x", Width-20)
        .attr("y", function (d,i) {
          var StationIndex = _.indexOf(_.map(MetrolinkStations.AllStations, (Station) => {return Station.toUpperCase();}), StationName);
          return ((Height - 40) / MetrolinkStations.AllStations.length) * StationIndex + 10 - 4;
        })
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
          return TimeInt/2 * (Width - 180)/12 + 180;
        })
        .attr("cy", function (d, i) {
          var StationIndex = _.indexOf(_.map(MetrolinkStations.AllStations, (Station) => {return Station.toUpperCase();}), StationName);
          return ((Height - 40) / MetrolinkStations.AllStations.length) * StationIndex + 10 - 4;
        })
        .attr("r", 4)
        .attr('fill', 'red')
        .attr('opacity', 0.3);
    },

    AddTotalCallsPerStation: (ChartSvg, CallsByStation) => {        
        // Add the count of total number of calls for each station 
        ChartSvg.selectAll('text.stationCount')
                .data(MetrolinkStations.AllStations)
                .enter()
                .append('text')
                .attr('class', 'stationCount')
                .text(function(d, i) {  // d here is the station's name
                  let CallsForThisStation = CallsByStation[d.toUpperCase()];                
                  return _.size(CallsForThisStation);
                })
                .attr("x", Width-5)
                .attr("y", function(d, i) {
                  return ((Height - 40) / MetrolinkStations.AllStations.length) * i + 10;
                })
                .attr('text-anchor', 'end');
    },

    FilterToSelectedCalls: (Data, CallsToCount) => {
      // First filter to only Metrolink calls:
      const MetrolinkCalls = _.where(Data, {Category:"METROLINK"});

      // Next filter to only the calls that we want to count:
      const SelectedMetrolinkCalls = _.filter(MetrolinkCalls, (Row) => {
          return _.contains(CallsToCount, Row.CallType);
      });

      return SelectedMetrolinkCalls;
    },

    GroupCallsByStation: (SelectedMetrolinkCalls) => {
      const CapitalizedStationNames = _.map(MetrolinkStations.AllStations, (ThisStation) => { return ThisStation.toUpperCase(); });
      return _.groupBy(
        SelectedMetrolinkCalls, 
        (ThisCall) => {
            return _.find(CapitalizedStationNames, (ThisStation) => {
                if (ThisCall.Location.indexOf(ThisStation+" -") != -1) { 
                  return true; 
                } else {
                    // console.error(ThisCall.Location)
                }
            });
        }
      );
    },
    
    CreateTimeValuesChart: (DivSelector, Data, CallsToCount) => {
        // Setting these manually for now:
        let Width = 780;
        let Height = 750;

        // Get all of the data that we're dealing with, and then group it by the calls at each station:
        const SelectedMetrolinkCalls = this.FilterToSelectedCalls(Data, CallsToCount);
        const CallsByStation = this.GroupCallsByStation(SelectedMetrolinkCalls);

        // Set up an SVG for us to use as the graph:        
        let ChartSvg = d3.select(DivSelector)
                .html("")
                .append('svg')
                .attr('width', Width)
                .attr('height', Height)

        // Add labels to our axes:
        this.AddTimeLabels(ChartSvg);
        this.AddStationLabels(ChartSvg, MetrolinkStations);

        _.each(CallsByStation, function(CallsAtStation, StationName) {
          this.AddCallsForStation(ChartSvg, StationName, CallsAtStation);
        });

        this.AddTotalCallsPerStation(ChartSvg, CallsByStation);            
    }
}

export default ChartHelper