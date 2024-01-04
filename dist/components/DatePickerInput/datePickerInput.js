"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DatePickerInput;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function DatePickerInput(_ref) {
  let {
    dateInput,
    onChange,
    onBlur,
    onKeyDown,
    inputStyle,
    showCalendar,
    inputRef
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("input", {
    ref: inputRef,
    id: "date",
    type: "datetime",
    placeholder: "Select date",
    value: dateInput,
    onChange: e => onChange(e.target.value),
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    style: inputStyle,
    className: "input-date",
    autoFocus: showCalendar
  });
}
;