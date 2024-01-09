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
    // Mount the DatePicker component with the specified date format
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, {
      dateFormat: "dd/MM/yyyy",
      minYear: 2000,
      maxYear: 2030,
      language: "en-EN"
    }));

    // Get the initial value of the input
    cy.get('[data-cy="input-date"]').invoke("val").as("initialValue");

    // Click to open the calendar
    cy.get(".calendar-icon").click();

    // Select the month of January
    cy.get('[data-cy="input-date"]').invoke("val").then(() => {
      const formattedDate = (0, _modelisation.formatDate)(new Date(), "dd/MM/yyyy");
      console.log("Selected Date:", formattedDate);

      // Check the month in the expected format
      const month = formattedDate.split("/")[1]; // Assuming the output format of formatDate is 'DD/MM/YYYY'
      cy.log("Month: ".concat(month));
      cy.get("select#calendar__month option:selected").should("have.text", "January");
    });

    // Select the year 2000
    cy.get("select#calendar__year").select("2000");
    cy.get("select#calendar__year option:selected").should("have.value", "2000");

    // Select the date in the calendar
    cy.get('[data-cy="calendar-date"]').contains("1").click();

    // Access the input-date within the DatePicker component
    cy.get('[data-cy="input-date"]').should("have.value", "01/01/2000");

    // Display the selected date in the console along with the initial value
    cy.get("@initialValue").then(initialValue => {
      cy.get('[data-cy="input-date"]').invoke("val").then(selectedDate => {
        console.log("Initial Value:", initialValue);
        console.log("Selected Date:", selectedDate);
      });
    });
  });
  
});