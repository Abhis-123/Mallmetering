import React from "react";
import GlobalContext from "../../state/GlobalContext";
// import axios from "axios"
import { Container, Row, Col } from "shards-react";
import { Card, CardHeader,  CardBody } from "shards-react";
import axios from "axios";
import * as d3 from 'd3v4'
class ListCustomers extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      updted: "",
      tableheadings: [ "Database","Bytes"],
      models:["Admin Database","Customer Database","Supervisor Database","Dummy Database",],
      data: [],
      tabledata: [],
      mode: "normal",
      row :{},
      D:[],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchdata= this.fetchdata.bind(this);
  }



componentDidUpdate(){
  
  var data =this.state.data

  var newdata =[]
  for(var i=0; i<data.length-1; i++){
    newdata.push(data[i])
  }
  data=newdata
var svg = d3.select('#pie').append('svg')
//select the svg with a class name instead of 'svg.'
//select the svg with an ID
    .attr("width", 400)
    .attr("height", 400);    
    
var radius = 150;      
      
var g = svg.append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")") ;

var color = d3.scaleOrdinal(['#ffd384','#94ebcd','#fbaccc','#fa7f72','#d3e0ea']);

var pie = d3.pie().value(function(d) { 
     return d.bytesusage; 
});

var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
 
var arc = g.selectAll()
    .data(pie(data))
    .enter()
    .append("g");

arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.bytesusage); });
    
var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
            
arc.append("text")
    .attr("transform", function(d) { 
        return "translate(" + label.centroid(d) + ")"; 
    })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.data.database + ": " + d.data.bytesusage+"B"; });    

}



  fetchdata() {
    console.log(axios.defaults.baseURL);
    axios
      .get(axios.defaults.baseURL + "/superadmin/config/?operation=memorydetails")
      .then(res => {
        console.log(res.data)

        this.setState({ data: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.fetchdata()
  }

  render() {
    
    const headings = this.state.tableheadings.map((heading, i) => {
      return (
        <th
          style={{
            fontWeight: "500"
          }}
          scope="col"
          className="border table-heading"
          key={i}
        >
          {heading}
        </th>
      );
    });

    const table_rows = this.state.data.map((row, index) => {
      return (
        <tr
          style={{
            fontWeight: "450"
          }}
          className="table-row"
          id={index}
          key={index}
        > 
          <td>{row.database}</td>
          <td>{row.bytesusage}</td>
          
        </tr>
      );
    });


    return (
      <Container fluid className="main-content-container px-4 mt-4 " style={{
        height:"110vh"
      }}>
            {/* Default Light Table */}
            <Row>
              <Col>
                <Card className="mb-4">
                  <CardHeader className="border-bottom">
                    <Row>
                      <Col lg={2}>
                        <h6 className="m-0">Database Size</h6>
                      </Col>
                      <Col>
                      </Col>
                     
                    </Row>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                      <thead className="bg-light">
                        <tr>{headings}</tr>
                      </thead>
                      <tbody>{table_rows}</tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>            
           <Card>
             <CardHeader>
             <Row>
                      <Col lg={2}>
                        <h6 className="m-0">A Pie Chart</h6>
                      </Col>
                      <Col>
                      </Col>
                     
                    </Row>
             </CardHeader>
             <CardBody>
             <div id="pie"></div>
             </CardBody>
           </Card>
          </Container>

          
    );
  }
}

export default ListCustomers;
