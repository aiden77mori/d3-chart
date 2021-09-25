/* ---------------------------------------------- 
    Name: Maksim Chapko (Web Developer)
    Version: 1.0
    Date: 09/07/2021
 ---------------------------------------------- */

import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      width: 1000,
      height: 550,
      margin: { top: 50, right: 130, bottom: 30, left: 120 },
      
      setday: '29/8/2021',
      scaleday: 1,

      data : [
        {Date: 'Wed Aug 27 0:02:40 UTC 2021',  Risk: 0, Temp: 37.5, HR: 65,  SBP: 145, DBP: 70, RR: 16, SPO2: 96, CO: 100, CI: 98,  SVR: 100, SV: 232},
        {Date: 'Wed Aug 27 1:02:40 UTC 2021',  Risk: 0, Temp: 37,   HR: 70,  SBP: 135, DBP: 85, RR: 14, SPO2: 96, CO: 100, CI: 83,  SVR: 333, SV: 123},
        {Date: 'Wed Aug 27 2:02:40 UTC 2021',  Risk: 0, Temp: 37.2, HR: 73,  SBP: 130, DBP: 63, RR: 15, SPO2: 96, CO: 100, CI: 555, SVR: 343, SV: 345},
        {Date: 'Wed Aug 27 3:02:40 UTC 2021',  Risk: 0, Temp: 37.7, HR: 75,  SBP: 122, DBP: 60, RR: 16, SPO2: 96, CO: 100, CI: 234, SVR: 234, SV: 87},
        {Date: 'Wed Aug 27 4:02:40 UTC 2021',  Risk: 1, Temp: 37.7, HR: 79,  SBP: 125, DBP: 53, RR: 17, SPO2: 96, CO: 100, CI: 12,  SVR: 123, SV: 87},
        {Date: 'Wed Aug 27 5:02:40 UTC 2021',  Risk: 1, Temp: 37.7, HR: 83,  SBP: 115, DBP: 52, RR: 18, SPO2: 95, CO: 100, CI: 34,  SVR: 345, SV: 454},
        {Date: 'Wed Aug 27 6:02:40 UTC 2021',  Risk: 2, Temp: 37.7, HR: 85,  SBP: 110, DBP: 45, RR: 19, SPO2: 95, CO: 100, CI: 45,  SVR: 123, SV: 545},
        {Date: 'Wed Aug 27 7:02:40 UTC 2021',  Risk: 2, Temp: 37.7, HR: 88,  SBP: 105, DBP: 51, RR: 20, SPO2: 95, CO: 100, CI: 67,  SVR: 234, SV: 456},
        {Date: 'Wed Aug 27 8:02:40 UTC 2021',  Risk: 0, Temp: 37.7, HR: 90,  SBP: 100, DBP: 45, RR: 21, SPO2: 94, CO: 100, CI: 234, SVR: 433, SV: 454},
        {Date: 'Wed Aug 27 9:02:40 UTC 2021',  Risk: 0, Temp: 37.7, HR: 95,  SBP: 101, DBP: 55, RR: 22, SPO2: 94, CO: 100, CI: 135, SVR: 245, SV: 234},
        {Date: 'Wed Aug 27 10:02:40 UTC 2021', Risk: 0, Temp: 38,   HR: 97,  SBP: 118, DBP: 62, RR: 23, SPO2: 94, CO: 100, CI: 345, SVR: 121, SV: 344},
        {Date: 'Wed Aug 27 11:02:40 UTC 2021', Risk: 0, Temp: 37.7, HR: 100, SBP: 100, DBP: 58, RR: 20, SPO2: 93, CO: 100, CI: 100, SVR: 100, SV: 433},
        {Date: 'Wed Aug 27 12:02:40 UTC 2021', Risk: 0, Temp: 37.5, HR: 100, SBP: 100, DBP: 58, RR: 21, SPO2: 94, CO: 100, CI: 100, SVR: 100, SV: 221},
        {Date: 'Wed Aug 27 13:02:40 UTC 2021', Risk: 1, Temp: 37.3, HR: 103, SBP: 98,  DBP: 55, RR: 22, SPO2: 94, CO: 100, CI: 123, SVR: 222, SV: 122},
        {Date: 'Wed Aug 27 14:02:40 UTC 2021', Risk: 1, Temp: 37.2, HR: 103, SBP: 95,  DBP: 50, RR: 21, SPO2: 95, CO: 100, CI: 567, SVR: 333, SV: 232},
        {Date: 'Wed Aug 27 15:02:40 UTC 2021', Risk: 1, Temp: 37,   HR: 105, SBP: 150, DBP: 60, RR: 21, SPO2: 95, CO: 100, CI: 234, SVR: 121, SV: 232},
        {Date: 'Wed Aug 27 16:02:40 UTC 2021', Risk: 2, Temp: 37,   HR: 105, SBP: 155, DBP: 65, RR: 22, SPO2: 94, CO: 100, CI: 234, SVR: 232, SV: 343},
        {Date: 'Wed Aug 27 17:02:40 UTC 2021', Risk: 2, Temp: 37.3, HR: 105, SBP: 140, DBP: 63, RR: 22, SPO2: 93, CO: 100, CI: 435, SVR: 141, SV: 343},
        {Date: 'Wed Aug 27 18:02:40 UTC 2021', Risk: 2, Temp: 37.5, HR: 105, SBP: 130, DBP: 61, RR: 23, SPO2: 94, CO: 100, CI: 234, SVR: 153, SV: 123},
        {Date: 'Wed Aug 27 19:02:40 UTC 2021', Risk: 2, Temp: 37.7, HR: 105, SBP: 120, DBP: 58, RR: 23, SPO2: 94, CO: 100, CI: 213, SVR: 233, SV: 343},
        {Date: 'Wed Aug 27 20:02:40 UTC 2021', Risk: 3, Temp: 38,   HR: 110, SBP: 120, DBP: 58, RR: 23, SPO2: 94, CO: 100, CI: 123, SVR: 100, SV: 234},
        {Date: 'Wed Aug 27 21:02:40 UTC 2021', Risk: 3, Temp: 38.3, HR: 115, SBP: 130, DBP: 55, RR: 24, SPO2: 94, CO: 100, CI: 563, SVR: 100, SV: 343},
        {Date: 'Wed Aug 27 22:02:40 UTC 2021', Risk: 4, Temp: 38.5, HR: 117, SBP: 110, DBP: 57, RR: 24, SPO2: 94, CO: 100, CI: 100, SVR: 123, SV: 234},
        {Date: 'Wed Aug 27 23:02:40 UTC 2021', Risk: 5, Temp: 38.7, HR: 120, SBP: 100, DBP: 53, RR: 26, SPO2: 94, CO: 100, CI: 100, SVR: 343, SV: 233},
        
        {Date: 'Wed Aug 28 0:02:40 UTC 2021',  Risk: 1, Temp: 38.5, HR: 63,  SBP: 145, DBP: 70, RR: 14, SPO2: 96, CO: 100, CI: 98,  SVR: 100, SV: 232},
        {Date: 'Wed Aug 28 1:02:40 UTC 2021',  Risk: 2, Temp: 38,   HR: 72,  SBP: 139, DBP: 85, RR: 13, SPO2: 96, CO: 100, CI: 83,  SVR: 333, SV: 123},
        {Date: 'Wed Aug 28 2:02:40 UTC 2021',  Risk: 1, Temp: 38.2, HR: 71,  SBP: 140, DBP: 63, RR: 13, SPO2: 96, CO: 100, CI: 555, SVR: 343, SV: 345},
        {Date: 'Wed Aug 28 3:02:40 UTC 2021',  Risk: 1, Temp: 37.7, HR: 70,  SBP: 142, DBP: 60, RR: 15, SPO2: 96, CO: 100, CI: 234, SVR: 234, SV: 87},
        {Date: 'Wed Aug 28 4:02:40 UTC 2021',  Risk: 2, Temp: 37.7, HR: 70,  SBP: 145, DBP: 53, RR: 14, SPO2: 96, CO: 100, CI: 12,  SVR: 123, SV: 87},
        {Date: 'Wed Aug 28 5:02:40 UTC 2021',  Risk: 2, Temp: 37.5, HR: 81,  SBP: 135, DBP: 52, RR: 15, SPO2: 95, CO: 100, CI: 34,  SVR: 345, SV: 454},
        {Date: 'Wed Aug 28 6:02:40 UTC 2021',  Risk: 2, Temp: 37.4, HR: 80,  SBP: 130, DBP: 45, RR: 17, SPO2: 95, CO: 100, CI: 45,  SVR: 123, SV: 545},
        {Date: 'Wed Aug 28 7:02:40 UTC 2021',  Risk: 1, Temp: 38.7, HR: 80,  SBP: 135, DBP: 51, RR: 18, SPO2: 95, CO: 100, CI: 67,  SVR: 234, SV: 456},
        {Date: 'Wed Aug 28 8:02:40 UTC 2021',  Risk: 2, Temp: 37.7, HR: 89,  SBP: 130, DBP: 45, RR: 20, SPO2: 94, CO: 100, CI: 234, SVR: 433, SV: 454},
        {Date: 'Wed Aug 28 9:02:40 UTC 2021',  Risk: 3, Temp: 37.7, HR: 90,  SBP: 121, DBP: 55, RR: 20, SPO2: 94, CO: 100, CI: 135, SVR: 245, SV: 234},
        {Date: 'Wed Aug 28 10:02:40 UTC 2021', Risk: 3, Temp: 38.3, HR: 95,  SBP: 128, DBP: 62, RR: 22, SPO2: 94, CO: 100, CI: 345, SVR: 121, SV: 344},
        {Date: 'Wed Aug 28 11:02:40 UTC 2021', Risk: 3, Temp: 36.7, HR: 97,  SBP: 120, DBP: 58, RR: 18, SPO2: 93, CO: 100, CI: 100, SVR: 100, SV: 433},
        {Date: 'Wed Aug 28 12:02:40 UTC 2021', Risk: 4, Temp: 36.5, HR: 99,  SBP: 120, DBP: 58, RR: 20, SPO2: 94, CO: 100, CI: 100, SVR: 100, SV: 221},
        {Date: 'Wed Aug 28 13:02:40 UTC 2021', Risk: 3, Temp: 36.3, HR: 100, SBP: 99,  DBP: 55, RR: 17, SPO2: 94, CO: 100, CI: 123, SVR: 222, SV: 122},
        {Date: 'Wed Aug 28 14:02:40 UTC 2021', Risk: 2, Temp: 36.2, HR: 100, SBP: 98,  DBP: 50, RR: 19, SPO2: 95, CO: 100, CI: 567, SVR: 333, SV: 232},
        {Date: 'Wed Aug 28 15:02:40 UTC 2021', Risk: 3, Temp: 36,   HR: 101, SBP: 100, DBP: 60, RR: 21, SPO2: 95, CO: 100, CI: 234, SVR: 121, SV: 232},
        {Date: 'Wed Aug 28 16:02:40 UTC 2021', Risk: 4, Temp: 37.7, HR: 102, SBP: 105, DBP: 65, RR: 25, SPO2: 94, CO: 100, CI: 234, SVR: 232, SV: 343},
        {Date: 'Wed Aug 28 17:02:40 UTC 2021', Risk: 4, Temp: 37.6, HR: 103, SBP: 100, DBP: 63, RR: 24, SPO2: 93, CO: 100, CI: 435, SVR: 141, SV: 343},
        {Date: 'Wed Aug 28 18:02:40 UTC 2021', Risk: 3, Temp: 37.4, HR: 107, SBP: 110, DBP: 61, RR: 23, SPO2: 94, CO: 100, CI: 234, SVR: 153, SV: 123},
        {Date: 'Wed Aug 28 19:02:40 UTC 2021', Risk: 4, Temp: 38.7, HR: 110, SBP: 120, DBP: 58, RR: 23, SPO2: 94, CO: 100, CI: 213, SVR: 233, SV: 343},
        {Date: 'Wed Aug 28 20:02:40 UTC 2021', Risk: 4, Temp: 38,   HR: 105, SBP: 110, DBP: 58, RR: 22, SPO2: 94, CO: 100, CI: 123, SVR: 100, SV: 234},
        {Date: 'Wed Aug 28 21:02:40 UTC 2021', Risk: 5, Temp: 38.3, HR: 104, SBP: 120, DBP: 55, RR: 24, SPO2: 94, CO: 100, CI: 563, SVR: 100, SV: 343},
        {Date: 'Wed Aug 28 22:02:40 UTC 2021', Risk: 5, Temp: 38.5, HR: 100, SBP: 100, DBP: 57, RR: 24, SPO2: 94, CO: 100, CI: 100, SVR: 123, SV: 234},
        {Date: 'Wed Aug 28 23:02:40 UTC 2021', Risk: 5, Temp: 38.7, HR: 102, SBP: 110, DBP: 53, RR: 26, SPO2: 94, CO: 100, CI: 100, SVR: 343, SV: 233},

        {Date: 'Wed Aug 29 0:02:40 UTC 2021',  Risk: 1, Temp: 35.5, HR: 103, SBP: 145, DBP: 70, RR: 19, SPO2: 96, CO: 100, CI: 98,  SVR: 100, SV: 232},
        {Date: 'Wed Aug 29 1:02:40 UTC 2021',  Risk: 1, Temp: 35.8, HR: 103, SBP: 135, DBP: 85, RR: 20, SPO2: 96, CO: 100, CI: 83,  SVR: 333, SV: 123},
        {Date: 'Wed Aug 29 2:02:40 UTC 2021',  Risk: 0, Temp: 36.2, HR: 102, SBP: 130, DBP: 63, RR: 21, SPO2: 96, CO: 100, CI: 555, SVR: 343, SV: 345},
        {Date: 'Wed Aug 29 3:02:40 UTC 2021',  Risk: 1, Temp: 36.7, HR: 100, SBP: 122, DBP: 60, RR: 22, SPO2: 96, CO: 100, CI: 234, SVR: 234, SV: 87},
        {Date: 'Wed Aug 29 4:02:40 UTC 2021',  Risk: 0, Temp: 36.7, HR: 110, SBP: 125, DBP: 53, RR: 20, SPO2: 96, CO: 100, CI: 12,  SVR: 123, SV: 87},
        {Date: 'Wed Aug 29 5:02:40 UTC 2021',  Risk: 0, Temp: 36.7, HR: 111, SBP: 115, DBP: 52, RR: 19, SPO2: 95, CO: 100, CI: 34,  SVR: 345, SV: 454},
        {Date: 'Wed Aug 29 6:02:40 UTC 2021',  Risk: 2, Temp: 36.7, HR: 108, SBP: 110, DBP: 45, RR: 20, SPO2: 95, CO: 100, CI: 45,  SVR: 123, SV: 545},
        {Date: 'Wed Aug 29 7:02:40 UTC 2021',  Risk: 1, Temp: 37,   HR: 100, SBP: 105, DBP: 51, RR: 18, SPO2: 95, CO: 100, CI: 67,  SVR: 234, SV: 456},
        {Date: 'Wed Aug 29 8:02:40 UTC 2021',  Risk: 1, Temp: 37,   HR: 99,  SBP: 100, DBP: 45, RR: 21, SPO2: 94, CO: 100, CI: 234, SVR: 433, SV: 454},
        {Date: 'Wed Aug 29 9:02:40 UTC 2021',  Risk: 2, Temp: 37,   HR: 95,  SBP: 101, DBP: 55, RR: 22, SPO2: 94, CO: 100, CI: 135, SVR: 245, SV: 234},
        {Date: 'Wed Aug 29 10:02:40 UTC 2021', Risk: 2, Temp: 37.2, HR: 97,  SBP: 118, DBP: 62, RR: 18, SPO2: 94, CO: 100, CI: 345, SVR: 121, SV: 344},
        {Date: 'Wed Aug 29 11:02:40 UTC 2021', Risk: 3, Temp: 37.3, HR: 93,  SBP: 100, DBP: 58, RR: 19, SPO2: 93, CO: 100, CI: 100, SVR: 100, SV: 433},
        {Date: 'Wed Aug 29 12:02:40 UTC 2021', Risk: 3, Temp: 37.5, HR: 91,  SBP: 100, DBP: 58, RR: 21, SPO2: 94, CO: 100, CI: 100, SVR: 100, SV: 221},
        {Date: 'Wed Aug 29 13:02:40 UTC 2021', Risk: 2, Temp: 37.3, HR: 95,  SBP: 98,  DBP: 55, RR: 20, SPO2: 94, CO: 100, CI: 123, SVR: 222, SV: 122},
        {Date: 'Wed Aug 29 14:02:40 UTC 2021', Risk: 2, Temp: 37.2, HR: 100, SBP: 95,  DBP: 50, RR: 21, SPO2: 95, CO: 100, CI: 567, SVR: 333, SV: 232},
        {Date: 'Wed Aug 29 15:02:40 UTC 2021', Risk: 3, Temp: 37,   HR: 102, SBP: 150, DBP: 60, RR: 23, SPO2: 95, CO: 100, CI: 234, SVR: 121, SV: 232},
        {Date: 'Wed Aug 29 16:02:40 UTC 2021', Risk: 4, Temp: 36.8, HR: 103, SBP: 155, DBP: 65, RR: 22, SPO2: 94, CO: 100, CI: 234, SVR: 232, SV: 343},
        {Date: 'Wed Aug 29 17:02:40 UTC 2021', Risk: 4, Temp: 37.3, HR: 105, SBP: 140, DBP: 63, RR: 22, SPO2: 93, CO: 100, CI: 435, SVR: 141, SV: 343},
        {Date: 'Wed Aug 29 18:02:40 UTC 2021', Risk: 3, Temp: 37.5, HR: 105, SBP: 130, DBP: 61, RR: 21, SPO2: 94, CO: 100, CI: 234, SVR: 153, SV: 123},
        {Date: 'Wed Aug 29 19:02:40 UTC 2021', Risk: 3, Temp: 37.7, HR: 105, SBP: 120, DBP: 58, RR: 20, SPO2: 94, CO: 100, CI: 213, SVR: 233, SV: 343},
        {Date: 'Wed Aug 29 20:02:40 UTC 2021', Risk: 4, Temp: 37,   HR: 107, SBP: 120, DBP: 58, RR: 20, SPO2: 94, CO: 100, CI: 123, SVR: 100, SV: 234},
        {Date: 'Wed Aug 29 21:02:40 UTC 2021', Risk: 5, Temp: 38.3, HR: 98,  SBP: 130, DBP: 55, RR: 19, SPO2: 94, CO: 100, CI: 563, SVR: 100, SV: 343},
        {Date: 'Wed Aug 29 22:02:40 UTC 2021', Risk: 5, Temp: 38.5, HR: 113, SBP: 110, DBP: 57, RR: 19, SPO2: 94, CO: 100, CI: 100, SVR: 123, SV: 234},
        {Date: 'Wed Aug 29 23:02:40 UTC 2021', Risk: 4, Temp: 38.7, HR: 115, SBP: 100, DBP: 53, RR: 17, SPO2: 94, CO: 100, CI: 100, SVR: 343, SV: 233},
      ],
    }
   
    this.dateChange = this.dateChange.bind(this);
    this.scaleChange = this.scaleChange.bind(this);
  }

  dateChange(day) {
    this.setState({setday: day}); 
  }

  scaleChange(scale) {
      this.setState({scaleday: scale});
  }

  render() {
    let dataset = [];
    const setday = this.state.setday;
    const scaleday = this.state.scaleday;
    let data = [];
    let k = 0;

    this.state.data.filter(function(d, i) {
      var date = new Date(d.Date).getUTCDate();
      var month = new Date(d.Date).getUTCMonth() + 1;
      var year = new Date(d.Date).getUTCFullYear();

      var makeday = date + '/' + month + '/' + year;
      var absday = (Date.UTC(year, month, date) - Date.UTC(setday.split('/')[2], setday.split('/')[1], setday.split('/')[0] )) / 1000 / 3600 / 24;

      if(setday === makeday && scaleday == 1 ) {
        data.push(d);
      } else if(scaleday == 3) {
        if( i % scaleday == 0)
          data.push(d);
      } else if(scaleday == 2) {
        if(absday > -scaleday && 0 >= absday && i % scaleday == 0) {
          if (k < 24) {
            data.push(d);
            k ++;
          }
        }
      }
    });

    data.forEach(function(d, i) {
        var date = new Date(d.Date).getUTCDate();
        var month = new Date(d.Date).getUTCMonth() + 1;
        var year = new Date(d.Date).getUTCFullYear();

        var hour = new Date(d.Date).getUTCHours();
        var minute = new Date(d.Date).getUTCMinutes();
        if (hour < 10) {
          hour = '0' + hour;
        }
        if (minute < 10) {
          minute = '0' + minute;
        }
        var makeday = date + '/' + month + '/' + year;
        var value = {
          'No': i,
          'Date': makeday,
          'Time': hour + ':' + minute,
          'Risk': d.Risk,
          'Temp': d.Temp,
          'yDomain': 0,
          'HR': d.HR,
          'SBP': d.SBP,
          'DBP': d.DBP,
          'RR': d.RR,
          'SPO2': d.SPO2,
          'CO': d.CO,
          'CI': d.CI,
          'SVR': d.SVR,
          'SV': d.SV,
        }
        dataset.push(value);            
    });
  
    return (
      <div className="App">
        <Chart data={dataset} 
               width={this.state.width} 
               setday={this.state.setday} 
               scaleday={this.state.scaleday}
               height={this.state.height} 
               margin={this.state.margin} 
               onDateChange={this.dateChange}
               onScaleChange={this.scaleChange}
               />
        <div className="tooltipbox">
            <div className="tempTooltip tooltip"></div>
            <div className="tempTooltipArrow tooltipArrow"></div>
            <div className="hbTooltip tooltip"></div>
            <div className="hbTooltipArrow tooltipArrow"></div>
            <div className="respTooltip tooltip"></div>
            <div className="respTooltipArrow tooltipArrow"></div>
          </div>
      </div>
    );
  }
  
}

export default App;
