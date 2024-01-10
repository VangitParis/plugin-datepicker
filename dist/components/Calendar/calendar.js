"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
require("./calendar.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Calendar Component
 *
 * @component
 * @typedef {Object} CalendarProps
 * @property {Function} onSelect - Callback function when a date is selected.
 * @property {Date} selectedDate - The currently selected date.
 * @property {Function} onDisplayChange - Callback function when the displayed month changes.
 * @property {Function} onKeyPress - Callback function when a key is pressed.
 * @property {number} minYear - The minimum selectable year.
 * @property {number} maxYear - The maximum selectable year.
 * @property {string} language - The language used for month names.
 * @property {Object} customStyles - Custom styles for the component.
 * @property {string} customStyles.monthSelectClass - Custom class for the select month elements.
 * @property {string} customStyles.yearSelectClass - Custom class for the select year elements.
 *
 * @param {CalendarProps} props - The component properties.
 * @returns {JSX.Element} The rendered Calendar component.
 */
function Calendar(_ref, ref) {
  let {
    onSelect,
    selectedDate,
    onDisplayChange,
    minYear,
    maxYear,
    language,
    customStyles
  } = _ref;
  const [displayed, setDisplayedMonth] = (0, _react.useState)(selectedDate || new Date());
  const [isMonthDropdownOpen, setMonthDropdownOpen] = (0, _react.useState)(false);
  const [isYearDropdownOpen, setYearDropdownOpen] = (0, _react.useState)(false);
  const monthSelectRef = (0, _react.useRef)(null);
  const yearSelectRef = (0, _react.useRef)(null);
  const daySelectRef = (0, _react.useRef)();
  console.log("Ref:", ref);
  const months = Array.from({
    length: 12
  }, (_, index) => index);

  // Interval of years based on minYear and maxYear properties
  const years = Array.from({
    length: maxYear - minYear + 1
  }, (_, index) => minYear + index);

  /**
   * Get the first day of the displayed month.
   *
   * @returns {Date} The first day of the displayed month.
   */
  const getFirstDayOfMonth = () => {
    const firstDayOfMonth = new Date(displayed);
    firstDayOfMonth.setDate(1);
    return firstDayOfMonth;
  };

  /**
   * Get the days of the displayed month with offset.
   *
   * @returns {number[]} The days of the month with offset.
   */
  const getDaysInMonthWithOffset = () => {
    try {
      const firstDayOfMonth = getFirstDayOfMonth();
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const daysInMonth = new Date(displayed.getFullYear(), displayed.getMonth() + 1, 0).getDate();
      console.log("First day of month:", firstDayOfMonth);
      console.log("First day of week:", firstDayOfWeek);
      console.log("Days in month:", daysInMonth);
      const offset = firstDayOfWeek;
      const days = Array.from({
        length: daysInMonth
      }, (_, index) => index + 1);
      const daysWithOffset = [...Array(offset).fill(null), ...days];
      console.log("Years:", years);
      return daysWithOffset;
    } catch (error) {
      console.error("Error in getDaysInMonthWithOffset:", error);
      return [];
    }
  };

  /**
   * Handle month change based on the given offset.
   *
   * @param {number} offset - The offset to change the month.
   */
  const handleMonthChange = offset => {
    const newDisplayedMonth = new Date(displayed);
    newDisplayedMonth.setMonth(displayed.getMonth() + offset);

    // Get last day of month
    const lastDayOfMonth = new Date(newDisplayedMonth.getFullYear(), newDisplayedMonth.getMonth() + 1, 0).getDate();

    // Adjust the day if the current day is greater than the last day of the month
    if (displayed.getDate() > lastDayOfMonth) {
      newDisplayedMonth.setDate(lastDayOfMonth);
    }

    // Check if the current date is still valid after adjusting the month
    if (newDisplayedMonth.getDate() !== displayed.getDate()) {
      newDisplayedMonth.setDate(0); // Move to the last day of the previous month
    }
    setDisplayedMonth(newDisplayedMonth);
    if (onDisplayChange) {
      onDisplayChange(newDisplayedMonth);
    }
  };

  /**
   * Handle click on the home button to reset to the current month.
   */
  const handleHomeClick = () => {
    const initialDate = new Date();
    setDisplayedMonth(initialDate);
    if (onSelect) {
      onSelect(initialDate);
    }
  };

  /**
   * Handle date selection for the given day.
   *
   * @param {number} day - The selected day.
   */
  const handleDateSelection = day => {
    const newDate = new Date(displayed.getFullYear(), displayed.getMonth(), day);
    setDisplayedMonth(newDate);
    if (onSelect) {
      onSelect(newDate);
    }
    if (onDisplayChange) {
      onDisplayChange(newDate);
    }
  };

  /**
   * Check if the given day is the currently displayed and selected date.
   *
   * @param {number} day - The day to check.
   * @returns {boolean} True if the day is the selected date, otherwise false.
   */
  const isSelectedDate = day => {
    return displayed && day === displayed.getDate();
  };
  /**
   * Handle dropdown click for the year and month selection.
   *
   * @param {number} selectedYear - The selected year.
   * @param {number} selectedMonth - The selected month.
   */
  const handleDropdownClick = (selectedYear, selectedMonth) => {
    const newDate = new Date(selectedYear, selectedMonth, displayed.getDate());
    setDisplayedMonth(newDate);
    if (onDisplayChange) {
      onDisplayChange(newDate);
    }

    // Update year and month of the input
    yearSelectRef.current.value = selectedYear;
    monthSelectRef.current.value = selectedMonth;

    // Close dropdown list
    setMonthDropdownOpen(false);
    setYearDropdownOpen(false);
    yearSelectRef.current.size = 1;
    monthSelectRef.current.size = 1;
  };

  /**
   * Handle key press for the selected day.
   *
   * @param {number} selectDay - The selected day.
   */
  const handleDayKeyPress = selectDay => {
    const newDate = new Date(displayed.getFullYear(), displayed.getMonth(), selectDay);
    setDisplayedMonth(newDate);
    if (onDisplayChange) {
      onDisplayChange(newDate);
    }
    daySelectRef.current.value = selectDay;
  };

  // Select class for customize
  const monthSelectClass = (customStyles === null || customStyles === void 0 ? void 0 : customStyles.monthSelectClass) || "default-month-select-class";
  const yearSelectClass = (customStyles === null || customStyles === void 0 ? void 0 : customStyles.yearSelectClass) || "default-year-select-class";

  // Use properties width and height
  const calendarStyle = (customStyles === null || customStyles === void 0 ? void 0 : customStyles.calendarStyle) || {};
  const buttonStyle = (customStyles === null || customStyles === void 0 ? void 0 : customStyles.buttonStyle) || {};

  // Render the Calendar component
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "calendar",
    className: "calendar",
    "data-cy": "calendar",
    style: calendarStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar__opts"
  }, /*#__PURE__*/_react.default.createElement("select", {
    ref: monthSelectRef,
    name: "calendar__month",
    id: "calendar__month",
    value: displayed.getMonth(),
    onChange: e => {
      const newMonth = new Date(displayed);
      newMonth.setMonth(parseInt(e.target.value, 10));
      setDisplayedMonth(newMonth);
      if (onDisplayChange) {
        onDisplayChange(newMonth);
      }
    },
    className: "month-dropdown ".concat(monthSelectClass, " ").concat(isMonthDropdownOpen ? "dropdown-open" : ""),
    tabIndex: 0,
    onFocus: e => {
      e.preventDefault();
      e.stopPropagation();
      e.target.classList.add("focused");

      // Is monthSelectRef.current  defined
      if (monthSelectRef.current) {
        setMonthDropdownOpen(true);
        monthSelectRef.current.size = 4;
      }
    },
    onBlur: e => {
      e.target.classList.remove("focused");
      // close dropdown if is open
      if (isMonthDropdownOpen && monthSelectRef.current) {
        setMonthDropdownOpen(false);
        monthSelectRef.current.size = 1;
      }
    },
    onKeyDown: e => {
      console.log("key code:", e.code);
      if (e.code === "Enter" && !isMonthDropdownOpen) {
        e.preventDefault();
        setMonthDropdownOpen(true);
        monthSelectRef.current.size = 2;
      } else if (e.code === "Enter" && isMonthDropdownOpen) {
        e.preventDefault();

        // Get month select value
        const selectedMonth = parseInt(monthSelectRef.current.value, 10);
        // Update date with function handleDropdownClick
        handleDropdownClick(displayed.getFullYear(), selectedMonth);
      }
    }
  }, months.map((month, index) => /*#__PURE__*/_react.default.createElement("option", {
    key: month,
    value: month,
    "data-cy": "calendar-month-option",
    tabIndex: index + 1,
    onClick: () => handleDropdownClick(displayed.getFullYear(), month, displayed.getDate())
  }, new Date(2000, month, 1).toLocaleDateString(language, {
    month: "long"
  })))), /*#__PURE__*/_react.default.createElement("select", {
    ref: yearSelectRef,
    name: "calendar__year",
    id: "calendar__year",
    value: displayed.getFullYear(),
    onChange: e => {
      e.stopPropagation();
      const newYear = new Date(displayed);
      newYear.setFullYear(parseInt(e.target.value, 10));
      setDisplayedMonth(newYear);
      if (onDisplayChange) {
        onDisplayChange(newYear);
      }
    },
    className: "year-dropdown ".concat(yearSelectClass, " ").concat(isYearDropdownOpen ? "dropdown-open" : ""),
    tabIndex: 0,
    onFocus: e => {
      e.preventDefault();
      e.stopPropagation();
      e.target.classList.add("focused");
      if (yearSelectRef.current) {
        setYearDropdownOpen(true);
        yearSelectRef.current.size = 4;
      }
    },
    onBlur: e => {
      e.target.classList.remove("focused");
      if (isYearDropdownOpen && yearSelectRef.current) {
        setYearDropdownOpen(false);
        yearSelectRef.current.size = 1;
      }
    },
    onKeyDown: e => {
      console.log("key code:", e.code);
      if (e.code === "Enter") {
        e.preventDefault();

        // Select Option
        const selectedYear = parseInt(e.target.value, 10);
        handleDropdownClick(selectedYear, displayed.getMonth());
      }
    }
  }, years.map((year, index) => /*#__PURE__*/_react.default.createElement("option", {
    key: year,
    value: year,
    tabIndex: index + 1,
    onClick: () => handleDropdownClick(year, displayed.getMonth(), displayed.getDate())
  }, year)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar__body"
  }, displayed && /*#__PURE__*/_react.default.createElement("div", {
    className: "flex-between-center"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "btn arrow-left ".concat(buttonStyle ? "custom-button-style" : ""),
    style: buttonStyle,
    "data-cy": "arrow-left",
    onClick: () => handleMonthChange(-1)
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faChevronLeft,
    tabIndex: 0,
    className: "icon"
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: "btn icon-home ".concat(buttonStyle ? "custom-button-style" : ""),
    style: buttonStyle,
    "data-cy": "icon-home",
    onClick: handleHomeClick
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faHome,
    tabIndex: 0,
    className: "icon"
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: "btn arrow-right ".concat(buttonStyle ? "custom-button-style" : ""),
    style: buttonStyle,
    "data-cy": "arrow-right",
    onClick: () => handleMonthChange(1)
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faChevronRight,
    tabIndex: 0,
    className: "icon"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar__days",
    "data-cy": "calendar__days"
  }, /*#__PURE__*/_react.default.createElement("div", null, "S"), /*#__PURE__*/_react.default.createElement("div", null, "M"), /*#__PURE__*/_react.default.createElement("div", null, "T"), /*#__PURE__*/_react.default.createElement("div", null, "W"), /*#__PURE__*/_react.default.createElement("div", null, "T"), /*#__PURE__*/_react.default.createElement("div", null, "F"), /*#__PURE__*/_react.default.createElement("div", null, "S")), /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar__dates"
  }, getDaysInMonthWithOffset().map((day, index) => /*#__PURE__*/_react.default.createElement("div", {
    ref: daySelectRef,
    key: index,
    className: "calendar__date ".concat(isSelectedDate(day) ? "selected" : ""),
    onClick: () => handleDateSelection(day),
    "data-cy": "calendar-date",
    tabIndex: 0,
    onKeyDown: e => {
      if (e.code === "Enter") {
        e.preventDefault();
        handleDayKeyPress(day);
        handleDateSelection(day);
      }
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    ref: daySelectRef,
    className: "calendar-day",
    "data-cy": "calendar-day"
  }, day))))));
}
var _default = exports.default = /*#__PURE__*/(0, _react.forwardRef)(Calendar);