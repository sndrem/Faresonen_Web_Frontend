import React, {Component} from "react";
import PropTypes from "prop-types";
import {Bar as BarChart} from "react-chartjs";
import "./DangerzoneStats.css";

class DangerzoneStats extends Component {
  static formatData(data) {
    const labels = data.map(t => t.name);
    return {
      labels,
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
    this.state = {
      data: DangerzoneStats.formatData(props.data),
      chartOptions: {
        responsive: true
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: DangerzoneStats.formatData(nextProps.data)
    });
  }

  render() {
    return (
      <div className="chart no-print">
        <BarChart data={this.state.data} options={this.state.chartOptions} />
      </div>
    );
  }
}

DangerzoneStats.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(
        PropTypes.shape({
          place: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          team: PropTypes.string.isRequired,
          value1: PropTypes.number.isRequired,
          value2: PropTypes.number.isRequired
        })
      ).isRequired
    })
  ).isRequired
};

export default DangerzoneStats;
