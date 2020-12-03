import React from 'react';
import { Line } from 'react-chartjs-2';
import { Mock } from "../components/Mock.js";
import Grid from '@material-ui/core/Grid';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datasets: [
                {
                  label: 'Temperatura',
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: 'rgba(255,0,0,1)',
                  borderColor: 'rgba(255,0,0,1)',
                  borderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 5,
                  data: Mock.temperature,
                  yAxisID: "A"
                },
                {
                  label: 'Densidade',
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: 'rgba(255,208,0,1)',
                  borderColor: 'rgba(255,208,0,1)',
                  borderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 5,
                  data: Mock.gravity,
                  yAxisID: "B"
                }
            ]
        }
    };

    render() {
        return (
           <Grid container spacing={3}>
              <Grid item xs={1} />
              <Grid item xs={10} >
              <Line
                data={this.state}
                options={{
                  title:{
                    display:true,
                    text:'Fermentação Red IIPA',
                    fontSize:20
                  },
                  legend:{
                    display:true,
                    position:'right'
                  },
                  scales: {
                    xAxes: [
                      {
                        type: "time",
                        time: {
                          unit: "day",
                          tooltipFormat: "lll"
                        },
                        gridLines: {
                          display: true
                        },
                        ticks: {
                          maxTicksLimit: 31
                        }
                      }
                    ],
                    yAxes: [{
                      id: 'A',
                      type: 'linear',
                      position: 'left',
                      ticks: {
                        max: 35,
                        min: 5,
                        callback: function(value, index, values) {
                          return value + " °C";
                        },
                      }
                    }, {
                      id: 'B',
                      type: 'linear',
                      position: 'right',
                      ticks: {
                        // max: 1.150,
                        min: 1,
                        callback: function(value, index, values) {
                          return value.toFixed(3);
                        },
                      }
                    }]
                  }
                }}
              />
            </Grid>
            <Grid item xs={1} />
          </Grid>
          );
    }

}

export default DashboardPage;
