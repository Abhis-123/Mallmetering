import React from "react";
import { Card, CardHeader, CardBody } from "shards-react";

import * as d3 from "d3v4";
import axios from "axios";
class UserCunsumptionGraph extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();

    this.state = {
      title: "Consumption",
      currenIndexes: [0],
      data: [],
      chartData: [],
      fetch: false,
      current:[],
    };
    this.plotgraph= this.plotgraph.bind(this);
    this.fetch= this.fetch.bind(this);
    this.handleonChange= this.handleonChange.bind(this);
    this.isShow= this.isShow.bind(this);
  }

handleonChange(name,checked){
  
}

 fetch(){
  if (!this.state.fetch) {
    axios
      .get(
        axios.defaults.baseURL +
          "/superadmin/dashboard/?operation=get_cunsumption_summary"
      )
      .then(response => {
        var data =[]
        var current=[]
        response.data.forEach(row => {
          var randomColor ="#"+ Math.floor(Math.random()*16777215).toString(16);
          current.push({name:row.name,show:true,color:randomColor})
          data.push({
            name: row.name, values:row.values,color:randomColor
          })
          
        })


        this.setState({
          data: data,
          fetch: true,
          current:current
        });
      });
  }
 }

 UNSAFE_componentWillMount() {
  this.fetch()
 }

 isShow(name) {
  var q=false
  var current = this.state.current
  current.map(function(user) {
    console.log('name '+ user.name+ " name" + name)
    if (user.name === name) {
      console.log('name '+ user.name)
      q =user.show
    }
    return false;
  })
  return q
 }

  componentDidUpdate(){
    this.plotgraph()
  }
  plotgraph() {
    console.log("fetched data");
    console.log(this.state.chartData);
    // Variables

    var data = []
    const dataset = this.state.data;
    const isShow = (name) => {

      var q=false
      this.state.current.map(function(user) {
        if (user.name === name) {
          q= user.show
        }
        return false;
      })
      return q
    }
    dataset.map(function(d) {
      if (isShow(d.name)) {
        data.push(d)
      }
      return 0
    })

   var cWidth= 900

   if(window.width<400){
    cWidth= 350
   }
   
   if(window.width<500){
      cWidth=480 
   }
    

    var svg = d3
        .select("#chart")
        .attr('width',cWidth)
        .attr("height", 400),
      margin = { top: 30, right: 40, bottom: 20, left: 40 },
      width = svg.attr("width") - margin.left - margin.right,
      height = svg.attr("height") - margin.top - margin.bottom;

      console.log(svg.attr('width'))
      
      
    // SVG G to provide D3 Margin Convention
    var g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Date Parser takes in Date string and returns JS Data Object
    // Scale X - time scale
    // Scale Y - linear scale
    // Scale Z - color categorical scale
    var x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      z = d3.scaleOrdinal(d3.schemeCategory10);

    // D3 Line generator with curveBasis being the interpolator
    var line = d3
      .line()
      .curve(d3.curveBasis)
      .x(function(d) {
        return x(d.time_stamp);
      })
      .y(function(d) {
        return y(d.reading_value);
      });

    /* Format Data */
    var parseDate = d3.timeParse("%Y-%m-%d");

    var xMax = parseDate("2000-01-01");
    var xMin = parseDate("2100-0-01");
    if(data.length===0){
      return true
    }
    data.forEach(function(d) {
      d.values.forEach(function(d) {
        var date =d.time_stamp.split('T')[0]
        d.time_stamp =parseDate(date)
        if(xMin >d.time_stamp){
          xMin = d.time_stamp
        } 
        if (xMax < d.time_stamp) {
          xMax = d.time_stamp;
        }
      });
    });
    console.log("xMax"+xMax);
    x.domain([xMin,xMax]);
    y.domain([
      d3.min(data, function(c) {
        return d3.min(c.values, function(d) {
          return d.reading_value;
        });
      }),
      d3.max(data, function(c) {
        return d3.max(c.values, function(d) {
          return d.reading_value;
        });
      })
    ]);

    z.domain(
      data.map(function(c) {
        return c.name;
      })
    );

    // Create X Axis
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Create Y Axis
    // Add Text label to Y axis
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .style("text-anchor", "end")
      .text("Counsumption in Watts");

    // Create a <g> element for each city
    // Note that 3 1st level arrays, so we get 3 g's
    var user = g
      .selectAll(".user")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "user");
   
      user
      .append("path")
      .attr("class", "line")
      .attr("d", function(d) {

        return line(d.values);
      })
      .style("color", function(d) {
        return d.color;
      })
      .style("stroke", function(d) {
        return d.color;
      }).style('stroke-width',2.5)
      .style("fill", "none");

    user
      .append("text")
      .datum(function(d) {
        return { name: d.name, value: d.values };
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.value.time_stamp) + "," + y(d.value.reading_value) + ")";
      })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .attr('text',function(d) {return d.name})
      .style("font", "10px sans-serif");

      // create legend
      var svgLegend = svg.append('g')
            .attr('class', 'gLegend')
            .attr("transform", "translate(" + (80) + "," + 10 + ")")

        var legend = svgLegend.selectAll('.legend')
          .data(data)
          .enter().append('g')
          .attr("class", "legend")
          .attr("transform", function (d, i) {return "translate(0," + i * 20 + ")"})

        legend.append("circle")
            .attr("class", "legend-node")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 6)
            .style("fill", d=>d.color)

        legend.append("text")
            .attr("class", "legend-text")
            .attr("x", 6*2)
            .attr("y", 6/2)
            .style("fill", "#A9A9A9")
            .style("font-size", 12)
            .text(d=>d.name)


            

    }

  render() {
    console.log(this.state.currenIndexes);
    console.log(this.state.data);
    const title = this.state.title;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <div className="row ">
            <h6 className="col-lg-8 col-md-6 m-0">{title}</h6>
            <div className="col-lg-4 col-md-6 col-sm-6">
            </div>
          </div>
        </CardHeader>
        <CardBody className="pt-0 row mt-4">
          <div className="col-lg-10 col-md-12 ">
            {/* <div ref={this.canvasRef} id="chart" style={{height:"100%",width:"100%"}}></div> */}
            <svg id="chart"></svg>
            {/* <canvas
              height="120"
              ref={this.canvasRef}
            /> */}
          </div>

         <div className="col-lg-2 col-md-3 p-4">
         
         {this.state.current.map((data, index) => {
           return(
            <div className="row"> 
            <label key={index}>
               <input type="checkbox"  onSelect={() => this.handleonChange()}/>
                 <span className="ml-4"
                    style={{
                      color:data.color
                    }}
                 > {data.name}</span>
              </label>
            </div>
           )
         })}
        </div>

        </CardBody>
      </Card>
    );
  }
}

export default UserCunsumptionGraph;
