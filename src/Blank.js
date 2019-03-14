import React from "react";
import PropTypes from "prop-types";

const Blank = props => {
  return <strong className="Seat-Icon">{props.row}</strong>;
};

Blank.propTypes = {
  row: PropTypes.string.isRequired
};

export default Blank;
