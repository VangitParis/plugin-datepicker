"use strict";

var _react = _interopRequireDefault(require("react"));
var _datePickerInput = _interopRequireDefault(require("./datePickerInput"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-undef */

describe("<DatePickerInput />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount( /*#__PURE__*/_react.default.createElement(_datePickerInput.default, null));

    // input was empty
    cy.get(".input-date").should("have.value", "");
  });
});