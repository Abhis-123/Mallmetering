import React from "react";
import { Card, CardHeader, CardBody, Button } from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";
import axios from 'axios';
import MUIDataTable from "mui-datatables";

class CounsumptionSummary extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();

    this.state = {
      title: "Consumption Summary",
      columns: [
        {
          name:"time_stamp",
          label:"Day-Time", options:{ filter:true, sort:true}
        },
        {
          name:"reading_value",
          label:"Consumption", options:{ filter:true, sort:true}

        },

    ],
    data:[],
      chartData: {
        labels:[
          "1 june","2 june ","3 june","4 june"
          ,"5 june","6 june","7 june","8 june"
          ,"9 june","10 june","11 june","12 june",
          "13 june","14 june ","15 june","16 june"
          ,"17 june","18 june","19 june","20 june"
          ,"21 june","22 june","23 june","24 june",
          "25 june","26 june ","27 june","28 june"
          ,"29 june","30 june","1 july","2 july" 
         ],
        datasets: [
          {
            label: "consumption",
            fill: "start",
            data: [
              500,
              800,
              320,
              180,
              240,
              320,
              230,
              650,
              590,
              1200,
              750,
              940,
              1420,
              1200,
              960,
              1450,
              1820,
              2800,
              2102,
              1920,
              3920,
              3202,
              3140,
              2800,
              3200,
              3200,
              3400,
              2910,
              3100,
              4250,
              2330,
              2330,
              
            ],
            backgroundColor: "rgba(0,123,255,0.1)",
            borderColor: "rgba(0,123,255,1)",
            pointBackgroundColor: "#ffffff",
            pointHoverBackgroundColor: "rgb(0,123,255)",
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 3
          }
        ]
      }
    };

    this.renderTable = this.renderTable.bind(this);
    this.fetchdata = this.fetchdata.bind(this);

  }

  renderTable(e) {
    e.preventDefault();
    const r = this.props.more;
    r("consumption");
  }

  fetchdata() {

    const action=this.context
    const u=action('get',{key:"userName"})
    axios
    .get(axios.defaults.baseURL + "/customers/getreadings/"+u+"/")
    .then(res => {
       let data= []
        res.data.map(row => {
          
          data.push({
            time_stamp:row.time_stamp,
            reading_value:row.reading_value,
            
          })
        })
        this.setState({ 
          data:data
        })
    })
    .catch(err => {
      console.log(err);
    });

}

componentDidMount(){
  this.fetchdata()
  
}

  /*componentDidMount() {
    const chartOptions = {
      ...{
        responsive: true,
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.2
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // show max 15 values
                  return index % 4 !== 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      ...this.state.chartOptions
    };

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.state.chartData,
      options: chartOptions
    });

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.state.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    BlogUsersOverview.render();
  }
  */
 
  render() {

    console.log("***********@@@@@@@@@@******")
  console.log(this.state.data)
    const title = this.state.title;
    return (
      <MUIDataTable
                     
                      data={this.state.data}
                      columns={this.state.columns}
                      //options={this.state.options}
                    /> 
    );
  }
}

export default CounsumptionSummary;
