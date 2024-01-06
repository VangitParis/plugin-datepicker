"use strict";

var _react = _interopRequireDefault(require("react"));
var _datePicker = _interopRequireDefault(require("./datePicker"));
var _modelisation = require("../../utils/modelisation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-undef */

describe("<DatePicker />", () => {
  it("renders and selects a date", () => {
    // Ensure the DatePicker component is rendered correctly
    // eslint-disable-next-line no-undef
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, null));
  });
  it("click and select date value", () => {
    // Mount the DatePicker component
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, null));

    // Get the initial value of the input
    cy.get(".input-date").invoke("val").as("initialValue");

    // Click to open the calendar
    cy.get(".calendar-icon").click();

    // Select the month of January
    cy.get('[data-cy="input-date"]').invoke('val').then(selectedDate => {
      const formattedDate = (0, _modelisation.formatDate)(new Date(selectedDate));
      console.log('Selected Date:', formattedDate);

      // Maintenant, vérifiez le mois dans le format attendu
      const month = formattedDate.split('/')[1]; // Supposons que le format de sortie de formatDate est 'DD/MM/YYYY'
      cy.log("Month: ".concat(month));
      cy.get("select#calendar__month option:selected").should("have.text", "janvier");
    });

    // cy.get("select#calendar__month").select("0");
    // cy.get("select#calendar__month option:selected").should("have.text", "January");

    // Select the year 2000
    cy.get("select#calendar__year").select("2000");
    cy.get("select#calendar__year option:selected").should('have.value', "2000");

    // Select the date in the calendar
    cy.get('[data-cy="calendar-date"]').contains('27').click();

    // Check that the selected date is displayed in the input
    cy.get('[data-cy="input-date"]').should('have.value', '27/01/2000');

    // Display the selected date in the console along with the initial value
    cy.get('@initialValue').then(initialValue => {
      cy.get('[data-cy="input-date"]').invoke('val').then(selectedDate => {
        console.log('Initial Value:', initialValue);
        console.log('Selected Date:', selectedDate);
      });
    });
  });
});