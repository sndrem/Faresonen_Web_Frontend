import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Form, Checkbox } from "semantic-ui-react";
import "./FantasyPlayerFilter.css";

class FantasyPlayerFilter extends Component {
  handleNameSearch = search =>
    this.props.setNameFilter(search.target.value.trim().toLowerCase());

  handlePriceSearch = search => {
    const { value } = search.target;
    if (isNaN(value) || !value) this.props.setPriceFilter(-1);
    else {
      this.props.setPriceFilter(parseFloat(value, 10));
    }
  };

  handleDreamTeamFilter = (event, data) => {
    this.props.setDreamTeamFilter(data.checked);
  };

  render() {
    return (
      <Segment>
        <p className="special">
          Her kan du filtrere spillere ved å søke etter fornavn/etternavn eller
          filtrere på pris.
        </p>
        <Form>
          <Form.Field>
            <label>Søk fritekst</label>
            <input
              placeholder="Søk etter navn"
              onChange={this.handleNameSearch}
            />
          </Form.Field>
          <Form.Field>
            <label>Filtrer på pris i pund (£)</label>
            <input type="number" step={0.1} onChange={this.handlePriceSearch} />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Vis kun Dream Team"
              onChange={this.handleDreamTeamFilter}
            />
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

FantasyPlayerFilter.propTypes = {
  setPriceFilter: PropTypes.func.isRequired,
  setNameFilter: PropTypes.func.isRequired,
  setDreamTeamFilter: PropTypes.func.isRequired
};

export default FantasyPlayerFilter;
