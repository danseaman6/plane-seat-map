import React from "react";
import PropTypes from "prop-types";
import SeatingRow from "./SeatingRow.js";

const Cabin = props => {
  return (
    <div className="Cabin">
      <h3>{props.class}</h3>
      {props.rows.map(row => (
        <SeatingRow
          seats={row.seats}
          aisles={row.aisles}
          handleSelectSeat={props.handleSelectSeat}
          selected={props.selected}
        />
      ))}
    </div>
  );
};

Cabin.propTypes = {
  class: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      aisles: PropTypes.arrayOf(PropTypes.string),
      seats: PropTypes.arrayOf(
        PropTypes.shape({
          seatID: PropTypes.string,
          seat: PropTypes.string,
          row: PropTypes.number,
          class: PropTypes.string,
          occupied: PropTypes.bool
        })
      )
    })
  ).isRequired,
  getSeatsByRow: PropTypes.func.isRequired,
  handleSelectSeat: PropTypes.func.isRequired,
  selected: PropTypes.string
};

Cabin.defaultProps = {
  selected: ""
};

export default Cabin;
