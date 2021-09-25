import React, { Component } from 'react';

import * as d3 from "d3";

let i = 0;
var width = window.innerWidth - 350, height = window.innerHeight - 85;
// var data = [];
var scaleday = null;
var setday = null;
class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            margin: this.props.margin,
            width: this.props.width,
            height: this.props.height,
            data: this.props.data,
            // setday: this.props.setday,
            // scaleday: this.props.scaleday,
        }
        scaleday = this.props.scaleday;
        setday = this.props.setday;
        
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleScaleChange = this.handleScaleChange.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        // this.drawChart([]);
        // this.intervalID = setInterval(
        //     () => this.drawChart(this.state.data),
        //     2000
        //   );
        this.drawChart();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentDidUpdate() {
        this.drawChart();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions(){
        if(window.innerWidth < 1000){
            width = 700;
            this.setState({width: 750});
        }
        else{
            width = window.innerWidth - 350;
            this.setState({width: window.innerWidth - 350});
        }
     }
    
    handleDateChange(event) {
        this.props.onDateChange(event.target.value);   
    }
    
    handleScaleChange(event) {
        this.props.onScaleChange(event.target.value);
    }

    drawChart() {
        // let data = dataset.slice(0, i);
        // if ( i === 24 ) {
        //     // clearInterval(this.intervalID);
        //     i = 0;  
        // }
        // i ++;
        let data = this.props.data;
        var margin = this.state.margin;
        // var width = this.state.width, height = this.state.height, margin = this.state.margin;
        
        const xScaleDay = d3.scaleLinear()
                            .domain([0, scaleday])
                            .range([0, width]);

        const xScale = d3.scaleLinear()
                        .domain([0, 23])
                        .range([0, width]);
        const yScale = d3.scaleLinear()
                        .domain([0, 23])
                        .range([0, height]);
        const oneXscale = xScale(1);
        const oneYscale = yScale(1);
        // y axis for temp
        const yScaleTemp = d3.scaleLinear()
                            .domain([35, 39])
                            .range([oneYscale*4 - oneYscale / 2, oneYscale / 2]);
        // y axis for heart rate and blood press
        const yScaleHB = d3.scaleLinear()
                            .domain([60, 180])
                            .range([oneYscale*7 - oneYscale / 2, oneYscale / 2]);
        // y axis for resp
        const yScaleResp = d3.scaleLinear()
                            .domain([10, 35])
                            .range([oneYscale*4 - oneYscale / 2, oneYscale / 2]);

        // y right axis for spo2
        const yScaleSpo2 = d3.scaleLinear()
                            .domain([70, 100])
                            .range([oneYscale*4 - oneYscale / 2, oneYscale / 2]);

        const svg = d3.select("#mainSVG")
        svg.selectAll("*").remove();
        svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        const mainSVG = d3.select("g");
        const labelGroup = mainSVG.append("g").attr("class", "labelGroup");
        // Add X grid lines with labels
        const xAxisDay = d3.axisTop(xScaleDay)
                            .tickSize(0)
                            .ticks(1).tickFormat('');
        const xAxisGroupDay = mainSVG.append('g').attr('transform', 'translate(0, 0)').call(xAxisDay);
        xAxisGroupDay.select(".domain").remove();

        const xAxis = d3.axisTop(xScale)
                        .tickSize(-height + oneYscale)
                        .ticks(24)
                        .tickFormat('');
        const xAxisGroup = mainSVG.append("g")
                                    .attr("class", "x-axis focus-x-axis")
                                    .attr("transform", `translate(0, ${oneYscale * 1})`)
                                    .call(xAxis);               
        xAxisGroup.select(".domain").remove();
        xAxisGroup.selectAll("line").attr("stroke", "rgba(128, 128, 128, 0.2)");
        xAxisGroup.selectAll("text")
                    .attr("transform", `translate(${oneXscale/2}, 0)`)
                    .attr("opacity", 0.5)
                    .attr("color", "black")
                    .attr("font-size", "0.75rem");
        xAxisGroup.append('line') //leftline
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("x1", 0)
                    .attr("y1", -oneYscale)
                    .attr("x2", 0)
                    .attr("y2", height - oneYscale);
        xAxisGroup.append('line') //rightline
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("x1", width + oneXscale)
                    .attr("y1", -oneYscale)
                    .attr("x2", width + oneXscale)
                    .attr("y2", height - oneYscale); 

        // tooltip settng function load
        tooltipEvent();
        // Day
        dayChart();
        // TIME
        timeChart();
        // Risk
        riskChart();
        // Temp
        tempChart();
        // Heart Rate(bpm) & Blood Pressure(mmHg)
        hbChart();
        // Resp Rate
        respChart();
        // SATS = SpO2
        spo2Chart();
        // OXYGEN = CO
        coChart();
        // AVPU = CI
        ciChart();
        // SVR
        svrChart();
        // SV
        svChart();

        mainSVG.selectAll('text').attr('fill', '#FFFFFF');

        // FUNCTION DEFINITION START
        function tooltipEvent() {      
            var focus = svg.append("g")
                            .attr("class", "focus tooltip-line-group")
                            .attr("transform", `translate(${margin.left} , ${margin.top + oneYscale})`);
            var tempTooltip = d3.select('.tempTooltip');
            var tempTooltipArrow = d3.select('.tempTooltipArrow');
            var hbTooltip = d3.select('.hbTooltip');
            var hbTooltipArrow = d3.select('.hbTooltipArrow');
            var respTooltip = d3.select('.respTooltip');
            var respTooltipArrow = d3.select('.respTooltipArrow');
            
            focus.selectAll('rect.hover-line')
                 .data(data)
                 .enter()
                 .append('rect')
                 .attr("fill", "#2FC8F5")
                 .attr('width', oneXscale)
                 .attr('class', 'line-chart hover-line')
                 .style('opacity', '0')
                 .attr('id', function(d, i) {
                    return 'line-' + i;
                 })
                 .attr('height', height - oneYscale)
                 .attr('x', function(d, i) {
                    return xScale(d.No);
                 }).on('mouseover', function(e, d) { 
                        d3.select(this).raise();
                        var currentLine = e.target.id;
                        d3.select('#'+currentLine).style('opacity', '.1');
                        var offsetX = (window.innerWidth - d3.select("#mainSVG").attr('width')) / 2;

                        tempTooltip.style('opacity', .8).style('left', function () {
                            return offsetX + margin.left + xScale(d.No) + oneXscale*1.3 + 'px';
                        }).style('top', function() {
                            return margin.top + oneYscale*3 + 5 + 'px';
                        }).html('<p>TEMP:</p><p>'+d.Temp+'</p>');
                        tempTooltipArrow.style('opacity', .7).style('left', function () {
                            return offsetX + margin.left + xScale(d.No) + oneXscale*1.3 + 'px';
                        }).style('top', function() {
                            return margin.top + oneYscale*3 + 20 + 'px';
                        });

                        hbTooltip.style('opacity', .8).style('left', function () {
                            return offsetX + margin.left + xScale(d.No) + oneXscale*1.3 + 'px';
                        }).style('top', function() {
                            return margin.top + oneYscale*7 + 5 + 'px';
                        }).html('<div><p>BP:</p><p>'+d.SBP+'/'+d.DBP+'</p></div><div>HR:' + d.HR + '</div>');
                        hbTooltipArrow.style('opacity', .7).style('left', function () {
                            return offsetX + margin.left + xScale(d.No) + oneXscale*1.3 + 'px';
                        }).style('top', function() {
                            return margin.top + oneYscale*7 + 25 + 'px';
                        });

                        // respTooltip.style('opacity', .8).style('left', function () {
                        //     return offsetX + margin.left + xScale(d.No) + oneXscale*1.3 + 'px';
                        // }).style('top', function() {
                        //     return margin.top + oneYscale*14 + 5 + 'px';
                        // }).html(d.RR);
                        respTooltip.style('opacity', .8).style('left', function () {
                            return offsetX + margin.left + xScale(d.No) + oneXscale*1.3 + 'px';
                        }).style('top', function() {
                            return margin.top + oneYscale*14 + 5 + 'px';
                        }).html('<div><p>SPO2:</p><p>'+d.SPO2+'</p></div><div>RESP:' + d.RR + '</div>');
                        respTooltipArrow.style('opacity', .7).style('left', function () {
                            return offsetX + margin.left + xScale(d.No) + oneXscale*1.3 + 'px';
                        }).style('top', function() {
                            return margin.top + oneYscale*14 + 25 + 'px';
                        });
                 }).on('mouseout', function(e, d) {
                        var currentLine = e.target.id;
                        d3.select('#'+currentLine).style('opacity', '0');
                        d3.selectAll(".tooltip").style("opacity", '0');
                        d3.selectAll('.tooltipArrow').style("opacity", '0');
                });
        }

        function dayChart() {
            var day = mainSVG.append("g").attr("class", "day").attr("transform", "translate(0, 0)");
            day.append('line')
               .attr("stroke", "black")
               .attr("stroke-width", 1)
               .attr("x1", 0)
               .attr("y1", 0)
               .attr("x2", width + oneXscale)
               .attr("y2", 0);
            labelGroup.append('text')
                        .attr("transform", "translate("+ -oneXscale*1.2 +" , "+ (oneYscale*0.5) +")")
                        .style("text-anchor", "start")
                        .style("color", 'black')
                        .style("font-size", "10px")
                        .text("DATE");
            day.append("g")
                .attr("class", "dayGroup")
                .selectAll(".daynum")
                .data(data)
                .enter()
                .append("text").classed("daynum", true)
                .text(function(d, i) { 
                    // console.log(data);
                    const sign = Math.floor(24 / scaleday);
                    if(!(i % sign)) {
                        return d.Date;
                        // return 'Fri 27/8/2021';
                    }
                    // return d.Date;
                }) 
                .attr('x', function(d, i) { return xScale(i) + (width/(scaleday)) / 2 })
                .attr("y", oneYscale/2 + 5)
                .attr("fill", "black")
                .style('font-size', '12px');
            day.append("g")
                .attr('class', 'daylineGroup')
                .selectAll('.dayline')
                .data(data)
                .enter()
                .append('line').classed('dayline', true)
                .attr('stroke', 'black')
                .attr('x1', function(d, i) { return xScale(i); })
                .attr('x2', function(d, i) { return xScale(i); })
                .attr('y1', '0')
                .attr('y2', function (d, i) { 
                    if(!(i % (24 / scaleday)) && i !== 0 && i !== 24) {
                        return height;
                    }
                })
        }

        function timeChart() {
            var time = mainSVG.append("g").attr("class", "time").attr("transform", "translate(0 , "+ oneYscale +")");
            time.append('line')
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", width + oneXscale)
                .attr("y2", 0);
            labelGroup.append('text')
                    .attr("transform", "translate("+ -oneXscale*1.2 +" , "+ (oneYscale*1.5) +")")
                    .style("text-anchor", "start")
                    .style("color", 'black')
                    .style("font-size", "10px")
                    .text("TIME");
            time.append("g")
                .attr("class", "timeGroup")
                .selectAll(".timenum")
                .data(data)
                .enter()
                .append("text").classed("timenum", true)
                .text(function(d) {
                    return d.Time;
                })
                .attr("x", (d, i) => xScale(i+0.15))
                .attr("y", oneYscale/2 + 5)
                // .attr("stroke", "black")
                .style('font-size', '12px');
        }

        function riskChart() {
            const risk = mainSVG.append("g").attr("class", "risk").attr("transform", "translate(0 , "+ (oneYscale * 2) +")");
            labelGroup.append('text')
                        .attr("transform", "translate("+ -oneXscale*1.2 +" , "+ (oneYscale*2.5) +")")
                        .style("text-anchor", "start")
                        .style("color", 'black')
                        .style("font-size", "10px")
                        .text("RISK");
            function RiskColor(value) {
                const color = ['#01ab70', '#01ab70', '#f0ad4e', '#f0ad4e', '#ed1c24', '#ed1c24'];
                return color[value];
            }
            const RiskRect = risk.append("g")
                                 .attr("class", "riskGroup")
                                 .selectAll(".riskrect")
                                 .data(data)
                                 .enter()
                                 .append("g").classed("riskrect", true);
            RiskRect.append('line')
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", width + oneXscale)
                    .attr("y2", 0);
            RiskRect.append("rect")
                    .attr("class", "eachrect")
                    .attr("x", (d, i) => { return xScale(d.No)} )
                    .attr("y", 0)
                    .attr("width", oneXscale-1)
                    .attr("height", oneYscale-1)
                    .style("fill", function(d) { return RiskColor(d.Risk) });
            d3.selectAll(".riskrect")
                .append("text")
                .text((d) => { return d.Risk })
                .attr("x", (d, i) => xScale(i+0.4))
                .attr("y", oneYscale/2 + 5)
                .attr('fill', 'white')
                .style('font-size', '11px');
        }
        
        function tempChart() {
            const yAxisTemp = d3.axisLeft(yScaleTemp)
                                // .ticks(d3.max(data.map(d => d.Temp)) - d3.min(data.map(d => d.Temp)) + 1);
                                .ticks(5);
            labelGroup.append('text')
                        .attr("transform", "rotate(-90)")
                        .attr("x", -oneYscale*6)
                        .attr("y", -oneXscale)
                        .style("color", 'black')
                        .style("font-size", "10px")
                        .text("TEMP (^C)");
            const temp = mainSVG.append("g")
                                .attr("class", "temp")
                                .attr("transform", "translate(0 , "+ (oneYscale * 3) +")")
                                .call(yAxisTemp);
            temp.select(".domain").remove();
            temp.selectAll("line")
                        .attr("stroke", "rgba(128, 128, 128, 0.2)");
            d3.selectAll("g.temp g.tick line")
                .attr("x2", function(d) { 
                                if(d === 37) { return width + oneXscale; }
                            });
            const tempGroup = temp.append("g")
                                        .attr("class", "tempGroup");
            tempGroup.selectAll("text")
                        .attr("opacity", 0.5)
                        .attr("color", "black")
                        .attr("font-size", "10px");
            tempGroup.append('line')
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .attr("x1", 0)
                        .attr("y1", 0)
                        .attr("x2", width + oneXscale)
                        .attr("y2", 0);
            // circle chart for temp
            tempGroup.selectAll("circle")
                        .data(data)
                        .enter().append("circle")
                        .attr("fill", "#fa00e5")
                        .attr("r", 4)
                        .attr("cx", function(d) { return xScale(d.No) +  oneXscale / 2; })
                        .attr("cy", function(d) { return yScaleTemp(d.Temp); });
            // line chart for temp
            var line = d3.line()
                            .x(function(d, i) { return xScale(d.No) + oneXscale / 2; })
                            .y(function(d, j) { return yScaleTemp(d.Temp); })
                            .curve(d3.curveMonotoneX);
            tempGroup.append('path')
                        .attr("stroke", "#fa00e5")
                        .attr("stroke-width", 1.5)
                        .attr("d", line(data));
        }

        function hbChart() {
            const yAxisHB = d3.axisLeft(yScaleHB).ticks(7);
            labelGroup.append('text')
                .attr("transform", "rotate(-90)")
                .attr("x", -oneYscale*13)
                .attr("y", -oneXscale*1.3)
                .style("color", 'black')
                .style("font-size", "10px")
                .text("HEART RATE (bpm) & ");
            labelGroup.append('text')
                .attr("transform", "rotate(-90)")
                .attr("x", -oneYscale*13)
                .attr("y", -oneXscale)
                .style("color", 'black')
                .style("font-size", "10px")
                .text("BLOOD PRESSURE (mmHg)");
            const hb = mainSVG.append("g")
                        .attr("class", "hb")
                        .attr("transform", "translate(0 , "+ (oneYscale * 7) +")")
                        .call(yAxisHB);
            hb.select(".domain").remove();
            hb.selectAll("line").attr("stroke", "rgba(128, 128, 128, 0.2)");
            d3.selectAll("g.hb g.tick line")
                .attr("x2", function(d) { 
                            if(d === 80 || d === 140) { return width + oneXscale; }
                        });
            const hbGroup = hb.append("g")
                                .attr("class", "hbGroup");
            hbGroup.selectAll("text")
                    .attr("opacity", 0.5)
                    .attr("color", "black")
                    .attr("font-size", "10px");
            hbGroup.append('line')
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", width + oneXscale)
                    .attr("y2", 0);
            // heart rate for hbchart
            var line = d3.line()
                            .x(function(d, i) { return xScale(d.No) + oneXscale / 2; })
                            .y(function(d, j) { return yScaleHB(d.HR); })
                            .curve(d3.curveMonotoneX);
            hbGroup.append('path')
                    .attr("stroke", "#7dc92e")
                    .attr("stroke-width", 1.5)
                    .attr("d", line(data));
            hbGroup.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("fill", "#7dc92e")
                    .attr("r", 4)
                    .attr("cx", function(d) { return xScale(d.No) +  oneXscale / 2; })
                    .attr("cy", function(d) { return yScaleHB(d.HR); });
            // blood pressure for hbChart
            hbGroup.selectAll('.bloodline')
                    .data(data)
                    .enter()
                    .append('g')
                    .classed('bloodline', true);
            d3.selectAll('.bloodline')
              .append('line')
              .attr("class", "bloodrange")
              .attr("x1", function(d) {
                return xScale(d.No) +  oneXscale / 2;  
              })
              .attr("x2", function(d) {
                return xScale(d.No) +  oneXscale / 2;  
              })
              .attr("y1", function(d) { 
                return yScaleHB(d.SBP); 
              })
              .attr("y2", function(d) {
                  if(d.DBP < 55) {
                    return yScaleHB(55);
                  } else {
                    return yScaleHB(d.DBP); 
                  }
              })
              .attr("stroke", "black")
              .attr("stroke-width", "2px");
            d3.selectAll('.bloodline')
                .append("line")
                .attr("class", "max")
                .attr("x1", function(d) {
                    return xScale(d.No) +  oneXscale / 2 - 7;
                })
                .attr("x2", function(d) {
                    return xScale(d.No) +  oneXscale / 2 + 7;
                })
                .attr("y1", function(d) {
                    return yScaleHB(d.SBP);
                })
                .attr("y2", function(d) {
                    return yScaleHB(d.SBP);
                })
                .style("stroke", "black")
                .style("stroke-width", "2px");
            d3.selectAll('.bloodline')
                .append("line")
                .attr("class", "min")
                .attr("x1", function(d) {
                    return xScale(d.No) +  oneXscale / 2 - 7;
                })
                .attr("x2", function(d) {
                    return xScale(d.No) +  oneXscale / 2 + 7;
                })
                .attr("y1", function(d) {
                    if(d.DBP < 55) {
                        d3.select(this.parentElement)
                        .append('circle')
                        .attr('r', '4')
                        .attr('cx', function(d) {
                            return xScale(d.No) + oneXscale / 2;
                        })
                        .attr('cy', function(d) { 
                            return yScaleHB(55);
                        })
                        .attr("fill", "red");
                        return yScaleHB(55);
                    } else {
                        return yScaleHB(d.DBP);
                    }
                })
                .attr("y2", function(d) {
                    if(d.DBP < 55) {
                        return yScaleHB(55);
                    } else {
                        return yScaleHB(d.DBP);
                    }
                })
                .style("stroke", "black")
                .style("stroke-width", "2px");

                d3.selectAll('.bloodline').selectAll('line').style("stroke", "#0c95db");
                // d3.selectAll('.bloodline').selectAll('line').style("stroke", "rgb(240 173 78)");
                // d3.selectAll('.bloodline').selectAll('line').style('stroke', "#01ab70");
        }
        
        function respChart() {
            const yAxisResp = d3.axisLeft(yScaleResp)
                                .ticks(6);
            // spo2line
            const yAxisSpo2 = d3.axisRight(yScaleSpo2)
                                .ticks(4);
            labelGroup.append('text')
                    .attr("transform", "rotate(-90)")
                    .attr("x", -oneYscale*17)
                    .attr("y", width + margin.right-5)
                    .style("color", 'black')
                    .style("font-size", "10px")
                    .text("SPO2 (%)");
            labelGroup.append('text')
                        .attr("transform", "rotate(-90)")
                        .attr("x", -oneYscale*17.8)
                        .attr("y", -oneXscale)
                        .style("color", 'black')
                        .style("font-size", "10px")
                        .text("RESP RATE (/min)");
            const resp = mainSVG.append("g")
                            .attr("class", "resp")
                            .attr("transform", "translate(0 , "+ (oneYscale * 14) +")")
                            .call(yAxisResp);
            // spo2line                            
            const spo2line = mainSVG.append('g')
                            .attr('class', 'spo2line')
                            .attr('transform', `translate(${width + oneXscale}, ${oneYscale * 14})`)
                            .call(yAxisSpo2);
            // spo2line
            spo2line.select(".domain").remove();
            resp.select(".domain").remove();
            resp.selectAll("line").attr("stroke", "rgba(128, 128, 128, 0.2)");
            d3.selectAll("g.resp g.tick line")
                .attr("x2", function(d) { 
                                if(d === 15 || d === 25) { return width + oneXscale; }
                            });
            // spo2line
            d3.selectAll("g.spo2line g.tick line")
                .attr("x2", function(d) { 
                    return 0;
                });
            const respGroup = resp.append("g").attr("class", "respGroup");
            // spo2line
            const spo2lineGroup = spo2line.append("g").attr('class', 'spo2lineGroup');
            respGroup.selectAll("text")
                .attr("opacity", 0.5)
                .attr("color", "black")
                .attr("font-size", "10px");
            respGroup.append('line')
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", width + oneXscale)
                .attr("y2", 0);
            var line = d3.line()
                        .x(function(d, i) { return xScale(d.No) + oneXscale / 2; })
                        .y(function(d, j) { return yScaleResp(d.RR); })
                        .curve(d3.curveMonotoneX);
            respGroup.append('path')
                    .attr("stroke", "#fdfd00")
                    .attr("stroke-width", 1.5)
                    .attr("d", line(data));
            respGroup.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("fill", "#fdfd00")
                .attr("r", 4)
                .attr("cx", function(d) { return xScale(d.No) +  oneXscale / 2; })
                .attr("cy", function(d) { return yScaleResp(d.RR); });
            //spo2line
            var lineforspo2 = d3.line()
                        .x(function(d, i) { return xScale(d.No) + oneXscale / 2 - (width + oneXscale); })
                        .y(function(d, j) { return yScaleSpo2(d.SPO2); })
                        .curve(d3.curveMonotoneX);
            spo2lineGroup.append('path')
                    .attr("stroke", "#48f7e0")
                    .attr("stroke-width", 1.5)
                    .attr("d", lineforspo2(data));
            spo2lineGroup.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("fill", "#48f7e0")
                .attr("r", 4)
                .attr("cx", function(d) { return xScale(d.No) +  oneXscale / 2 - (width + oneXscale); })
                .attr("cy", function(d) { return yScaleSpo2(d.SPO2); });
        }

        function spo2Chart() {
            const spo2 = mainSVG.append("g").attr("class", "spo2").attr("transform", "translate(0 , "+ (oneYscale * 18) +")");
            spo2.append('line')
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", width + oneXscale)
                .attr("y2", 0);
            labelGroup.append('text')
                      .attr("transform", "translate("+ -margin.left +" , "+ (oneYscale*18.6) +")")
                      .style("text-anchor", "start")
                      .style("color", 'black')
                      .style("font-size", "10px")
                      .text("SPO2 (%)");
            spo2.append("g")
                .attr("class", "spo2Group")
                .selectAll(".spo2num")
                .data(data)
                .enter()
                .append("text").classed("spo2num", true)
                .text((d) => { return d.SPO2 })
                .attr("x", function(d, i) {
                    if (d.SPO2 < 100) {
                        return xScale(i + 0.33);
                    } else {
                        return xScale(i + 0.25);
                    }
                })
                .attr("y", oneYscale/2 + 5)
                // .attr("stroke", "black")
                .style('font-size', '12px');
        }

        function coChart() {
            const co = mainSVG.append("g").attr("class", "co").attr("transform", "translate(0 , "+ (oneYscale * 19) +")");
            co.append('line')
              .attr("stroke", "black")
              .attr("stroke-width", 1)
              .attr("x1", 0)
              .attr("y1", 0)
              .attr("x2", width + oneXscale)
              .attr("y2", 0);
            labelGroup.append('text')
                        .attr("transform", "translate("+ -margin.left +" , "+ (oneYscale*19.6) +")")
                        .style("text-anchor", "start")
                        .style("color", 'black')
                        .style("font-size", "10px")
                        .text("CO (L/min)");
            co.append("g")
                .attr("class", "coGroup")
                .selectAll(".conum")
                .data(data)
                .enter()
                .append("text").classed("conum", true)
                .text((d) => { return d.CO })
                .attr("x", function(d, i) {
                    if (d.CO < 100) {
                        return xScale(i + 0.33);
                    } else {
                        return xScale(i + 0.25);
                    }
                })
                .attr("y", oneYscale/2 + 5)
                // .attr("stroke", "black")
                .style('font-size', '12px');
        }

        function ciChart() {
            const ci = mainSVG.append("g").attr("class", "ci").attr("transform", "translate(0 , "+ (oneYscale * 20) +")");
            ci.append('line')
              .attr("stroke", "black")
              .attr("stroke-width", 1)
              .attr("x1", 0)
              .attr("y1", 0)
              .attr("x2", width + oneXscale)
              .attr("y2", 0);
            labelGroup.append('text')
                        .attr("transform", "translate("+ -margin.left +" , "+ (oneYscale*20.6 ) +")")
                        .style("text-anchor", "start")
                        .style("color", 'black')
                        .style("font-size", "10px")
                        .text("CI (L/min/m2)");
            ci.append("g")
                .attr("class", "ciGroup")
                .selectAll(".cinum")
                .data(data)
                .enter()
                .append("text").classed("cinum", true)
                .text((d) => { return d.CI })
                .attr("x", function(d, i) {
                    if (d.CI < 100) {
                        return xScale(i + 0.33);
                    } else {
                        return xScale(i + 0.25);
                    }
                })
                .attr("y", oneYscale/2 + 5)
                // .attr("stroke", "black")
                .style('font-size', '12px');

        }

        function svrChart() {
            const svr = mainSVG.append("g").attr("class", "SVR").attr("transform", "translate(0 , "+ (oneYscale * 21) +")");
            svr.append('line')
               .attr("stroke", "black")
               .attr("stroke-width", 1)
               .attr("x1", 0)
               .attr("y1", 0)
               .attr("x2", width + oneXscale)
               .attr("y2", 0);
            labelGroup.append('text')
                        .attr("transform", "translate("+ -margin.left +" , "+ (oneYscale*21.6) +")")
                        .style("text-anchor", "start")
                        .style("color", 'black')
                        .style("font-size", "10px")
                        .text("SVR (mmHg·min/L)");
            svr.append("g")
                .attr("class", "svrGroup")
                .selectAll(".svrnum")
                .data(data)
                .enter()
                .append("text").classed("svrnum", true)
                .text((d) => { return d.SVR })
                .attr("x", function(d, i) {
                    if (d.SVR < 100) {
                        return xScale(i + 0.33);
                    } else {
                        return xScale(i + 0.25);
                    }
                })
                .attr("y", oneYscale/2 + 5)
                // .attr("stroke", "black")
                .style('font-size', '12px');
        }

        function svChart() {
            const sv = mainSVG.append("g").attr("class", "SV").attr("transform", "translate(0 , "+ (oneYscale * 22) +")");
            sv.append('line')
               .attr("stroke", "black")
               .attr("stroke-width", 1)
               .attr("x1", 0)
               .attr("y1", 0)
               .attr("x2", width + oneXscale)
               .attr("y2", 0);
            sv.append('line')
               .attr("stroke", "black")
               .attr("stroke-width", 1)
               .attr("x1", 0)
               .attr("y1", oneYscale)
               .attr("x2", width + oneXscale)
               .attr("y2", oneYscale);
            labelGroup.append('text')
                        .attr("transform", "translate("+ -margin.left +" , "+ (oneYscale*22.6) +")")
                        .style("text-anchor", "start")
                        .style("color", 'black')
                        .style("font-size", "10px")
                        .text("SV (mL)");
            sv.append("g")
                .attr("class", "svGroup")
                .selectAll(".svnum")
                .data(data)
                .enter()
                .append("text").classed("svnum", true)
                .text((d) => { return d.SV })
                .attr("x", function(d, i) {
                    if (d.SV < 100) {
                        return xScale(i + 0.33);
                    } else {
                        return xScale(i + 0.25);
                    }
                })
                .attr("y", oneYscale/2 + 5)
                // .attr("stroke", "black")
                .style('font-size', '12px');
        }
        // FUNCTION DEFINITION END
    }

    render() {
        setday = this.props.setday;
        scaleday = this.props.scaleday;
        this.drawChart();
        return (
            <div style={{backgroundColor: 'rgb(10, 58, 91)'}}>
                <div style={{position: 'absolute', left: (this.state.width/1.7)}}>
                <span style={{color: 'white'}}>MySkypeID: live:.cid.c45f533673f2d580</span>
                <br />
                    <select className="datePicker daypicker" value={setday} onChange={this.handleDateChange}>
                        <option>29/8/2021</option>
                        <option>28/8/2021</option>
                        <option>27/8/2021</option>
                    </select>  
                    <select className="scalePicker daypicker" value={scaleday} onChange={this.handleScaleChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>  
                    {setday}
                    - 
                    {scaleday}
                    
                </div> 
                <svg id="mainSVG" width={width + this.state.margin.left + this.state.margin.right} 
                        height={height + this.state.margin.top + this.state.margin.bottom} />
            </div>
            
        )
    }
}

export default Chart;