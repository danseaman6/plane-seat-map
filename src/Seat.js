import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Seat = props => {
  return (
    <Button
      className="Seat-Icon"
      variant={props.selected ? "danger" : props.occupied ? "primary" : "light"}
      onClick={() => props.handleSelectSeat(props.occupied ? "" : props.seatID)}
    >
      {props.seat}
    </Button>
  );
};

Seat.propTypes = {
  seatID: PropTypes.string.isRequired,
  seat: PropTypes.string.isRequired,
  occupied: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  handleSelectSeat: PropTypes.func.isRequired
};

export default Seat;
