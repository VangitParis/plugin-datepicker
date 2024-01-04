"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDateInput = exports.formatDate = void 0;
const formatDate = date => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return "".concat(day, "/").concat(month, "/").concat(year);
};

// Fonction pour convertir une chaîne de date en instance de Date
//TODO try/catch
exports.formatDate = formatDate;
const parseDateInput = input => {
  const parts = input.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return null;
};
exports.parseDateInput = parseDateInput;