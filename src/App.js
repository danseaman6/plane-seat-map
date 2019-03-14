import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import wretch from "wretch";
import Cabin from "./Cabin.js";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class App extends Component {
  state = {
    rows: [],
    selected: ""
  };

  componentDidMount = () => {
    wretch(
      "https://s3.amazonaws.com/frontend-candidate-homework.lola.co/seats.json"
    )
      .get()
      .json()
      .then(response => {
        let seats = response.map(seat => ({
          ...seat,
          seatID: this.uniqueID()
        }));

        // get all the seats sorted right off the bat
        seats.sort((a, b) =>
          a.row > b.row ? 1 : a.row === b.row ? (a.seat > b.seat ? 1 : -1) : -1
        );

        seats.sort((a, b) => (a.row >= b.row ? 1 : -1));

        let rows = [];
        let row = 1;
        while (true) {
          let newRow = this.getSeatsByRow({ row, seats });
          if (!newRow.length) {
            break;
          }

          let letters = newRow.map(seat => seat.seat).join("");
          const missingLetters = this.findMissingLetters(letters);
          missingLetters.forEach(letter => {
            return newRow.push({
              seat: letter,
              row: row,
              class: "blank",
              occupied: false
            });
          });
          newRow.sort((a, b) => (a.seat > b.seat ? 1 : -1));

          rows.push({ seats: newRow, aisles: missingLetters });
          row++;
        }
        this.setState({ rows });
      });
  };

  getRowsByClass = className => {
    return this.state.rows.filter(row => {
      return row.seats[0].class === className;
    });
  };

  getSeatsByRow = ({ row, seats }) => {
    return seats.filter(seat => {
      return seat.row === row;
    });
  };

  findMissingLetters = letters => {
    let lettersCurrent = 0,
      alphabetCurrent = 0,
      missing = [];

    while (lettersCurrent < letters.length) {
      if (letters.charAt(lettersCurrent) === ALPHABET.charAt(alphabetCurrent)) {
        alphabetCurrent++;
      } else {
        missing.push(ALPHABET.charAt(alphabetCurrent));
        alphabetCurrent += 2;
      }
      lettersCurrent++;
    }
    return missing;
  };

  uniqueID = () => {
    let key = "";
    for (let i = 0; i < 12; i++) {
      key += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return key;
  };

  handleSelectSeat = seatID => {
    this.setState({ selected: seatID });
  };

  render() {
    return (
      <Container className="App">
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Button variant="primary" disabled>
              Reserved
            </Button>
          </Col>
          <Col xs lg="2">
            <Button variant="light" disabled>
              Available
            </Button>
          </Col>
          <Col xs lg="2">
            <Button variant="danger" disabled>
              Selected
            </Button>
          </Col>
        </Row>
        <Row className="Cabin-Container">
          <Cabin
            class="First"
            rows={this.getRowsByClass("First")}
            getSeatsByRow={this.getSeatsByRow}
            handleSelectSeat={this.handleSelectSeat}
            selected={this.state.selected}
          />
        </Row>

        <Row className="Cabin-Container">
          <Cabin
            class="Business"
            rows={this.getRowsByClass("Business")}
            getSeatsByRow={this.getSeatsByRow}
            handleSelectSeat={this.handleSelectSeat}
            selected={this.state.selected}
          />
        </Row>

        <Row className="Cabin-Container">
          <Cabin
            class="Economy"
            rows={this.getRowsByClass("Economy")}
            getSeatsByRow={this.getSeatsByRow}
            handleSelectSeat={this.handleSelectSeat}
            selected={this.state.selected}
          />
        </Row>
      </Container>
    );
  }
}

export default App;
