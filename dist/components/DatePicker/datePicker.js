"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DatePicker;
var _react = _interopRequireWildcard(require("react"));
var _calendar = _interopRequireDefault(require("../Calendar/calendar"));
var _modelisation = require("../../utils/modelisation.js");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
require("./datePicker.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * DatePicker Component
 *
 * @param {{
 *   minYear: number,
 *   maxYear: number,
 *   customInputClass: string,
 *   dateFormat: string,
 *   language: string,
 *   errorClass: string,
 *   errorMessage : string,
 *   customStyles: {
 *     calendarStyle: Object,
 *     monthSelectClass: Object,
 *     yearSelectClass: Object,
 *     buttonStyle: Object,
 *     dateStyle: Object,
 *   },
 * }} props - The component properties.
 *
 * @returns {JSX.Element} The rendered DatePicker component.
 */
function DatePicker(_ref) {
  let {
    showCurrentDateOnMount = true,
    minYear,
    maxYear,
    dateFormat,
    language,
    customInputClass,
    errorClass: externalErrorClass,
    errorMessage: externalErrorMessage,
    id,
    type,
    onChange,
    customStyles: {
      calendarStyle,
      monthSelectClass,
      yearSelectClass,
      buttonStyle,
      dateStyle
    } = {}
  } = _ref;
  // State variables for managing the selected date, input value, calendar visibility, and error message
  const [selectedDate, setSelectedDate] = (0, _react.useState)("");
  const [dateInput, setDateInput] = (0, _react.useState)("");
  const [showCalendar, setShowCalendar] = (0, _react.useState)(false);
  const [errorMessage, setErrorMessage] = (0, _react.useState)(null);
  const [clickInsideCalendar, setClickInsideCalendar] = (0, _react.useState)(false);

  // Reference to the input element
  const inputRef = (0, _react.useRef)(null);
  const calendarRef = (0, _react.useRef)(null);

  /**
   * useEffect to initialize the date with the current date if selectedDate is empty.
   */
  (0, _react.useEffect)(() => {
    if (showCurrentDateOnMount && !selectedDate) {
      const currentDate = new Date();
      setSelectedDate(currentDate);
      setDateInput((0, _modelisation.formatDate)(currentDate, dateFormat));
    }
    const handleClick = event => {
      if (event.target.closest("#calendar")) {
        handleCalendarClick();
        setSelectedDate((0, _modelisation.parseDateInput)(dateInput));
      } else {
        handleClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [dateFormat, selectedDate, showCalendar, clickInsideCalendar, dateInput]);

  /**
   * Toggles the calendar visibility, opens only if errorMessage is null.
   */
  const toggleCalendar = () => {
    if (!showCalendar) {
      // Si le calendrier n'est pas ouvert, l'ouvrir directement si le champ est vide par défaut au click 
      if (dateInput === "") {
        console.log(dateInput);
        const currentDate = new Date();
        setDateInput((0, _modelisation.formatDate)(currentDate, dateFormat));
        setSelectedDate(currentDate);
        handleDateChange((0, _modelisation.formatDate)(selectedDate || currentDate, dateFormat));
        setShowCalendar(true);
      } else {
        const currentDate = new Date();
        setDateInput((0, _modelisation.formatDate)(currentDate, dateFormat));
        setSelectedDate(currentDate);
        handleDateChange((0, _modelisation.formatDate)(selectedDate || currentDate, dateFormat));
        setShowCalendar(true);
      }
      // Si une date est sélectionnée, on met à jour le champ et la date actuelle
      if (selectedDate) {
        setDateInput((0, _modelisation.formatDate)(selectedDate, dateFormat));
      } else {
        // Sinon, utilisez la date actuelle et on met à jour le champ
        const currentDate = new Date();
        setDateInput((0, _modelisation.formatDate)(currentDate, dateFormat));
        setSelectedDate(currentDate);
        handleDateChange((0, _modelisation.formatDate)(selectedDate || currentDate, dateFormat));
      }
      setErrorMessage(null);
    } else if (errorMessage === null) {
      // Si le calendrier est déjà ouvert et aucune erreur, on ne change pas la date sélectionnée
      setShowCalendar(true);
    } else {
      // Si une erreur est présente, vider le champ et utiliser la date actuelle
      const currentDate = new Date();
      setDateInput("");
      setSelectedDate(currentDate);
      handleDateChange((0, _modelisation.formatDate)(currentDate, dateFormat));
      setErrorMessage(null);
    }
  };

  /**
   * Handles click outside of the calendar, closes the calendar and selects the input value.
   */
  const handleClickOutside = () => {
    if (showCalendar && !clickInsideCalendar) {
      // Close calendar and select value of input
      setShowCalendar(false);
      setSelectedDate((0, _modelisation.parseDateInput)(dateInput));
    }
    setClickInsideCalendar(false);
    calendarRef.current = showCalendar;
  };

  /**
   * Handles click inside the calendar, sets clickInsideCalendar to true.
   */
  const handleCalendarClick = () => {
    if (!showCalendar) {
      setClickInsideCalendar(false);
      setDateInput(dateInput);
    }
  };

  /**
   * Handles the click on a date in the calendar, updates the input, and closes the calendar.
   * @param {Date} date - The selected date.
   */
  const handleCalendarDateClick = date => {
    setSelectedDate(date);
    const formattedDate = (0, _modelisation.formatDate)(date);
    setDateInput(formattedDate);
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
   * Updates the selected date if the new date is valid, otherwise sets an error message.
   * @param {Date} newDate - The new date.
   */
  const updateDate = newDate => {
    if (newDate && !isNaN(newDate.getTime()) && newDate.getFullYear() >= minYear && newDate.getFullYear() <= maxYear && newDate.getMonth() >= 0 && newDate.getMonth() <= 11 && newDate.getDate() >= 1 && newDate.getDate() <= new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()) {
      setSelectedDate(newDate);
      setShowCalendar(true);
      setErrorMessage(null);
    } else {
      setShowCalendar(false);
      setErrorMessage("Invalid date format");
    }
  };

  /**
   * Handles the change of the input date, parses the input and updates the state accordingly.
   * @param {string} inputValue - The input value.
   */
  const handleDateChange = inputValue => {
    // Vérifier si la date est valide avant de mettre à jour les valeurs
    console.log("Change date value", inputValue);
    const parsedDate = (0, _modelisation.parseDateInput)(inputValue);
    setDateInput(inputValue);
    updateDate(parsedDate);
    setShowCalendar(false);
    if (onChange) {
      onChange(parsedDate);
    }
  };

  /**
   * Handles blur event, updates the date based on the input value.
   */
  const handleBlur = () => {
    handleDateChange(dateInput);
  };

  /**
   * Handles key press events, opens the calendar and displays the entered date on 'Enter'.
   * @param {Event} e - The key press event.
   */
  const handleKeyPress = e => {
    if (e.code === "Enter") {
      toggleCalendar();
    } else if (e.code === "Escape") {
      if (!clickInsideCalendar) {
        setShowCalendar(false);
        setSelectedDate((0, _modelisation.parseDateInput)(dateInput));
      }
      setErrorMessage(null);
    } else if (e.code !== "Tab") {
      setShowCalendar(false);
    }
  };

  // JSX for rendering the component
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "input-container"
  }, /*#__PURE__*/_react.default.createElement("input", {
    ref: inputRef,
    id: id,
    type: type,
    placeholder: "dd/mm/yyyy",
    value: dateInput,
    onChange: e => handleDateChange(e.target.value),
    autoFocus: showCalendar,
    onBlur: handleBlur
    // onKeyDown={handleKeyPress}
    ,
    className: "input-date ".concat(externalErrorClass || errorMessage !== null ? "error-border" : "", " ").concat(customInputClass ? customInputClass.className : "", " focused"),
    "data-cy": "input-date"
    // onMouseDown={toggleCalendar}
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCalendarDay,
    className: "calendar-icon",
    "data-cy": "calendar-icon",
    onClick: toggleCalendar,
    tabIndex: 0,
    onKeyDown: handleKeyPress
  })), errorMessage !== null && /*#__PURE__*/_react.default.createElement("p", {
    className: "error-message ".concat(externalErrorClass || "custom-error-message")
  }, externalErrorMessage || errorMessage), showCalendar && /*#__PURE__*/_react.default.createElement(_calendar.default, {
    ref: calendarRef,
    "data-cy": "calendar",
    selectedDate: selectedDate,
    onSelect: handleCalendarDateClick,
    onDisplayChange: handleDisplayChange,
    onChange: handleDateChange,
    onKeyPress: handleKeyPress,
    minYear: minYear,
    maxYear: maxYear,
    language: language,
    customStyles: {
      monthSelectClass,
      yearSelectClass,
      calendarStyle,
      buttonStyle,
      dateStyle
    },
    tabIndex: 0,
    dateFormat: dateFormat
  }));
}