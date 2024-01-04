"use strict";

var _react = _interopRequireDefault(require("react"));
var _calendar = _interopRequireDefault(require("./calendar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-undef */

describe("<Calendar />", () => {
  it("renders month into Calendar", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount( /*#__PURE__*/_react.default.createElement(_calendar.default, null));
  });
  it("click prev month", () => {
    //Show Calendar Component
    cy.mount( /*#__PURE__*/_react.default.createElement(_calendar.default, null));

    // Get initial month
    cy.get("select#calendar__month option:selected").should("have.text", "December");

    // Click on button "arrow-left"
    cy.get('[data-cy="arrow-left"]').click();

    // After click, it should be month  "November"
    cy.get("select#calendar__month option:selected").should("have.text", "November");
  });
  it("click next month", () => {
    //Show Calendar Component
    cy.mount( /*#__PURE__*/_react.default.createElement(_calendar.default, null));

    // Get initial month and year
    cy.get("select#calendar__month option:selected").should("have.text", "December");
    cy.get("select#calendar__year option:selected").should("have.text", new Date().getFullYear().toString());
    // Click on button "arrow-right"
    cy.get('[data-cy="arrow-right"]').click();

    // After click, it should be month  "January"
    cy.get("select#calendar__month option:selected").should("have.text", "January");

    // After click, it should be year "2024"
    cy.get("select#calendar__year option:selected").should("have.text", "2024");
  });
  it("click home button", () => {
    //Show Calendar Component
    cy.mount( /*#__PURE__*/_react.default.createElement(_calendar.default, null));
    //Click on button "home"
    cy.get('[data-cy="icon-home"]').click();
    // After click, it should be initial month "December"
    cy.get("select#calendar__month option:selected").should("have.text", "December");
  });
});