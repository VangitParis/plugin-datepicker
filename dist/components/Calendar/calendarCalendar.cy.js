"use strict";

var _react = _interopRequireDefault(require("react"));
var _calendar = _interopRequireDefault(require("./calendar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-undef */

describe('<Calendar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount( /*#__PURE__*/_react.default.createElement(_calendar.default, null));
  });
});