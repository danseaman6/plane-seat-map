import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import Seat from "./Seat.js";
import Blank from "./Blank.js";

const SeatingRow = props => {
  return (
    <div className="Seating-Row">
      {props.seats.map(seat =>
        seat.class === "blank" ? (
          <Col lg={1}>
            <Blank row={seat.row} />
          </Col>
        ) : (
          <Col lg={1}>
            <Seat
              seatID={seat.seatID}
              seat={seat.seat}
              occupied={seat.occupied}
              selected={seat.seatID === props.selected}
              handleSelectSeat={props.handleSelectSeat}
            />
          </Col>
        )
      )}
    </div>
  );
};

SeatingRow.propTypes = {
  aisles: PropTypes.arrayOf(PropTypes.string).isRequired,
  seats: PropTypes.arrayOf(
    PropTypes.shape({
      seatID: PropTypes.string,
      seat: PropTypes.string,
      row: PropTypes.number,
      class: PropTypes.string,
      occupied: PropTypes.bool
    })
  ).isRequired,
  handleSelectSeat: PropTypes.func.isRequired,
  selected: PropTypes.string
};

SeatingRow.defaultProps = {
  selected: ""
};

export default SeatingRow;
