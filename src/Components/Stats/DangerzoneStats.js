import React, { Component } from "react";
import { Bar as BarChart } from "react-chartjs";
import tools from "../../Tools/tools";
import "./DangerzoneStats.css";

class DangerzoneStats extends Component {
  static formatData(data) {
    return {
      labels: data.map(t => t.name),
      datasets: [
        {
          label: "Spillere i faresonen",
          fillColor: "#1263be",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "#da0529",
          highlightStroke: "rgba(220,220,220,1)",
          data: data.map(t => t.players.length)
        }
      ]
    };
  }

  constructor(props) {
    super(props);
    const filteredData = DangerzoneStats.formatData(props.data);
    this.state = {
      data: filteredData,
      chartOptions: {
        responsive: true
      },
      loading: true
    };
  }

  render() {
    return (
      <div className="chart no-print">
        <BarChart data={this.state.data} options={this.state.chartOptions} />
      </div>
    );
  }
}
export default DangerzoneStats;
