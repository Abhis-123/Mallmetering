import * as d3 from 'd3';

export function drawChart(height, width, data){
    const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    
    var selection = svg.selectAll("rect").data(data);
    // ....
    // rest of the d3 code from chart.html
    // .....
}

