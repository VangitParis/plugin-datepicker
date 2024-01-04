"use strict";

var _react = _interopRequireDefault(require("react"));
var _datePicker = _interopRequireDefault(require("./datePicker"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-undef */

describe("<DatePicker />", () => {
  it("renders and selects a date", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, null));
  });
  it("click and selected date value", () => {
    // DatePicker component
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, null));

    // input was empty
    cy.get(".input-date").should("have.value", "");

    // click to input
    cy.get(".calendar-icon").click();

    // onSelect date month
    cy.get("select#calendar__month").select("0");
    cy.get("select#calendar__month option:selected").should("have.text", "January");

    // onSelect date year
    cy.get("select#calendar__year").select("2000");
    cy.get("select#calendar__year option:selected").should('have.value', "2000");

    // onSelect date into calendar day
    cy.get('[data-cy="calendar-date"]').should('not.have.value', 'Jane');
    cy.get('[data-cy="calendar-date"]').contains('27').click();

    // show date into input
    cy.get('[data-cy="input-date"]').should('have.value', '27/01/2000');

    // Show date selected into log console 
    cy.get('[data-cy="input-date"]').invoke('val').then(selectedDate => {
      console.log('Selected Date:', selectedDate);
    });
  });
});