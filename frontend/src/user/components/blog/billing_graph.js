import React from "react";
import { Card, CardHeader, CardBody,Button } from "shards-react";

import * as d3 from "d3v4";
import axios from "axios";
import GlobalContext from "../../state/GlobalContext";
class UserCunsumptionGraph extends React.Component {
  static contextType = GlobalContext;
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();

    this.state = {
      title: "Billing",
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
    this.renderTable= this.renderTable.bind(this);
    this.componentDidUpdate=this.componentDidUpdate.bind(this);
  }

handleonChange(name,checked){
  
}

renderTable(e) {
  e.preventDefault();
  const r = this.props.more;
  console.log("&&&&&&&&&&&&&&&&")
  console.log(r)
  r("consumption");
}


 fetch(){


  if (!this.state.fetch) {

    const action = this.context
    var username = action('get',{key:"userName"})
    axios
      .get(
        axios.defaults.baseURL +
          "/customers/getreadings/"+username+"/"
      )
      .then(response => {
        var data =[]
        var randomColor ="#"+ Math.floor(Math.random()*16777215).toString(16);

        var billing=[]

        const getprice = (reading)=>{
            if(reading<1000){
              return reading*3.1
            }else if(reading<2000){
              return reading*5
            }else{
              return reading*5.5
            }
        }
        response.data.forEach(row => {
            billing.push({
              reading_value:getprice(row.reading_value),
              time_stamp:row.time_stamp
            })
        })
        data.push({
          name:"Billing Graph", 
          color:randomColor,
          values: billing
        })
        this.setState({
          data: data,
          fetch: true,
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
    var data= this.state.data

   
    

    var svg = d3
        .select("#chart2")
        .attr('width',600)
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

    if(data.length===0){
      return true
    }
    data.forEach(function(d) {
      d.values.forEach(function(d) {
        var date =d.time_stamp.split('T')[0]
        d.time_stamp =parseDate(date) 
        if (xMax < d.time_stamp) {
          xMax = d.time_stamp;
        }
      });
    });

    x.domain(d3.extent(data[0].values, d => d.time_stamp));
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
      .text("Bill in Rupee");

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
          <Button
                className="btn-white mr-0"
                //onClick={this.renderTable}
              >
                More &rarr;
          </Button>
        </CardHeader>
        <CardBody className="pt-0 row mt-4">
          <div className="col-lg-10 col-md-12 ">
            {/* <div ref={this.canvasRef} id="chart" style={{height:"100%",width:"100%"}}></div> */}
            <svg id="chart2"></svg>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default UserCunsumptionGraph;
