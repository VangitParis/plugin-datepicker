"use strict";

var _react = _interopRequireDefault(require("react"));
var _datePicker = _interopRequireDefault(require("./datePicker"));
var _modelisation = require("../../utils/modelisation");
var _calendar = _interopRequireDefault(require("../Calendar/calendar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-undef */

describe("<DatePicker />", () => {
  it("renders and selects a date", () => {
    // Ensure the DatePicker component is rendered correctly
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, null));
  });
  it("clicks and selects date value", () => {
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

      // Check the month in the expected format : the output format of formatDate is 'DD/MM/YYYY
      const month = formattedDate.split("/")[1];
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
  it("renders and selects a date with custom styles", () => {
    const customStyles = {
      calendarStyle: {
        width: "300px",
        height: "300px"
      }
    };
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, null));
    // Click to open the calendar
    cy.get(".calendar-icon").click();

    // Mount the DatePicker component with custom styles
    cy.mount( /*#__PURE__*/_react.default.createElement(_calendar.default, {
      minYear: 2000,
      maxYear: 2030,
      dateFormat: "dd/MM/yyyy",
      language: "en-EN",
      font: "Arial",
      fontSize: "16px",
      backgroundColor: "#f0f0f0",
      color: "#333",
      customStyles: customStyles
    }));

    // Check if the calendar width is correct
    cy.get('[data-cy="calendar"]').should("have.css", "width", customStyles.calendarStyle.width);

    // Check if the calendar height is correct
    cy.get('[data-cy="calendar"]').should("have.css", "height", customStyles.calendarStyle.height);
  });
  it("displays error message for invalid date", () => {
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, {
      dateFormat: "dd/MM/yyyy",
      minYear: 2000,
      maxYear: 2030,
      language: "en-EN"
    }));

    // Clear initial date of input
    cy.get('[data-cy="input-date"]').clear();

    // Test with invalid date day
    cy.get('[data-cy="input-date"]').type("39/09/2020{enter}");

    // Error message should be visible
    cy.get(".error-message").should("be.visible").and("have.text", "Invalid date format");

    // Clear initial date of input
    cy.get('[data-cy="input-date"]').clear();

    // Test with invalid date month
    cy.get('[data-cy="input-date"]').type("01/49/2020{enter}");

    // Error message should be visible
    cy.get(".error-message").should("be.visible").and("have.text", "Invalid date format");

    // Clear initial date of input
    cy.get('[data-cy="input-date"]').clear();

    // Test with invalid date year
    cy.get('[data-cy="input-date"]').type("01/01/2090{enter}");

    // Error message should be visible
    cy.get(".error-message").should("be.visible").and("have.text", "Invalid date format");
  });
  it("verifies autofocus on input", () => {
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, {
      dateFormat: "dd/MM/yyyy",
      minYear: 2000,
      maxYear: 2030,
      language: "en-EN",
      autofocus: true
    }));
    // Check if the input is focused
    cy.get("input").should("have.class", "focused");
  });
});
describe("Calendar", () => {
  it("verifies that 01/01/2024 is a Monday", () => {
    const dateToCheck = new Date(2024, 0, 1); // Month starts from 0, so January is 0

    // Mount the Calendar component with the specified date
    cy.mount( /*#__PURE__*/_react.default.createElement(_calendar.default, {
      onSelect: () => {},
      selectedDate: null,
      onDisplayChange: () => {},
      minYear: 2000,
      maxYear: 2030,
      language: "en-EN",
      customStyles: {
        calendarStyle: {
          backgroundColor: "#f0f0f0",
          color: "#333",
          font: "Arial",
          fontSize: "16px"
        }
      },
      displayed: dateToCheck
    }));

    // Check if the first day of the month in the calendar is a Monday
    cy.get('[data-cy="calendar__days"] div').eq(1).should("have.text", "M");
  });
  it("should close calendar on outside click", () => {
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePicker.default, {
      minYear: 2000,
      maxYear: 2030,
      language: "en-EN"
    }));

    // Click to open the calendar
    cy.get(".calendar-icon").click();

    // Check if the calendar is open
    cy.get("#calendar").should("be.visible");

    // Click outside of Calendar
    cy.get("body").click(0, 50);
    cy.wait(500);

    // Check if id=calendar is not present in the body
    cy.get('body').should('not.have.id', 'calendar');
  });
});