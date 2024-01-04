"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DatePicker;
var _react = _interopRequireWildcard(require("react"));
var _calendar = _interopRequireDefault(require("../Calendar/calendar"));
var _modelisation = require("../../utils/modelisation");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _datePickerInput = _interopRequireDefault(require("../DatePickerInput/datePickerInput"));
require("./datePicker.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * React component for a date picker.
 * @param {{minYear : number, maxYear: number, customClass: string, dateFormat:string, dateFormat:string, language:string,font:string, fontSize:string }}
 */
function DatePicker(_ref) {
  let {
    minYear,
    maxYear,
    customClass,
    dateFormat,
    language,
    font,
    fontSize
  } = _ref;
  // State variables for managing the selected date, input value, calendar visibility, and error message
  const [selectedDate, setSelectedDate] = (0, _react.useState)("");
  const [dateInput, setDateInput] = (0, _react.useState)("");
  const [showCalendar, setShowCalendar] = (0, _react.useState)(false);
  const [errorMessage, setErrorMessage] = (0, _react.useState)(null);

  // Reference to the input element
  const inputRef = (0, _react.useRef)(null);

  /**
   * useEffect to initialize the date with the current date if selectedDate is empty.
   */
  (0, _react.useEffect)(() => {
    if (!selectedDate) {
      const currentDate = new Date();
      setSelectedDate(currentDate);
      setDateInput((0, _modelisation.formatDate)(currentDate, dateFormat || "yyyy/MM/dd"));
    }
  }, [dateFormat, selectedDate]);

  /**
   * Toggles the calendar visibility, opens only if errorMessage is null.
   */
  const toggleCalendar = () => {
    if (errorMessage === null) {
      setShowCalendar(!showCalendar);
    }
  };

  /**
   * Handles the click on a date in the calendar, updates the input, and closes the calendar.
   * @param {Date} date - The selected date.
   */
  const handleCalendarDateClick = date => {
    setSelectedDate(date);
    setDateInput((0, _modelisation.formatDate)(date));
    setShowCalendar(false);
    setErrorMessage(null);
  };

  /**
   * Handles the change of displayed date in the calendar.
   * @param {Date} newDisplayedDate - The newly displayed date.
   */
  const handleDisplayChange = newDisplayedDate => {
    setSelectedDate(newDisplayedDate);
    setDateInput((0, _modelisation.formatDate)(newDisplayedDate));
    setErrorMessage(null);
  };

  /**
   * Handles the change of the input date, parses the input and updates the state accordingly.
   * @param {Event} event - The input change event.
   */
  const handleDateChange = event => {
    const inputValue = event.target.value;
    const newDate = (0, _modelisation.parseDateInput)(inputValue);
    if (newDate && !isNaN(newDate.getTime())) {
      setSelectedDate(newDate);
      setDateInput((0, _modelisation.formatDate)(newDate));
      setShowCalendar(true);
      setErrorMessage("");
    } else {
      setShowCalendar(false);
      setErrorMessage("Invalid date format");
    }
  };

  /**
   * Handles key press events, opens the calendar and displays the entered date on 'Enter'.
   * @param {Event} event - The key press event.
   */
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      const parsedDate = (0, _modelisation.parseDateInput)(dateInput);
      if (parsedDate && !isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setShowCalendar(true);
        setErrorMessage("");
      } else {
        event.preventDefault();
        setShowCalendar(false);
        setErrorMessage("Invalid date format");
      }
    }
    if (event.key === "Escape") {
      setShowCalendar(false);
    }
  };

  // Style for the input element
  const inputStyle = {
    fontFamily: font,
    fontSize: fontSize
  };

  // JSX for rendering the component
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "input-container"
  }, /*#__PURE__*/_react.default.createElement(_datePickerInput.default, {
    dateInput: dateInput,
    onChange: handleDateChange,
    onBlur: handleDateChange,
    onKeyDown: handleKeyPress,
    inputStyle: inputStyle,
    showCalendar: showCalendar,
    inputRef: inputRef
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCalendarDay,
    className: "calendar-icon",
    "data-cy": "calendar-icon",
    onClick: toggleCalendar,
    onFocus: toggleCalendar
  }), errorMessage !== null && /*#__PURE__*/_react.default.createElement("p", {
    className: "error-message"
  }, errorMessage)), showCalendar && /*#__PURE__*/_react.default.createElement(_calendar.default, {
    selectedDate: selectedDate,
    onSelect: handleCalendarDateClick,
    onDisplayChange: handleDisplayChange,
    onKeyPress: handleKeyPress,
    minYear: minYear,
    maxYear: maxYear,
    language: language,
    customStyles: {
      selectClass: "custom-select-class"
    },
    tabIndex: 0
  }));
}