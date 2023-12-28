/* eslint-disable no-undef */
import React from "react";
import DatePicker from "./datePicker";
import Calendar from "../Calendar/calendar";
import { formatDate } from "../../utils/modelisation";

describe("<DatePicker />", () => {
  it("renders and selects a date", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DatePicker />);
  });
  it("click and selected date value", () => {
    // DatePicker component
    cy.mount(<DatePicker />);

    // input was empty
    cy.get(".calendar-icon").should("have.value", "");

    // click to input
    cy.get(".calendar-icon").click();


    // onSelect date month
    cy.get("select#calendar__month").select("0");
    cy.get("select#calendar__month option:selected").should(
      "have.text",
      "January"
    );

    // onSelect date year
    cy.get("select#calendar__year").select("2000");
    cy.get("select#calendar__year option:selected").should(
      'have.value', "2000");

    // onSelect date into calendar day
    cy.get('[data-cy="calendar-date"]').should('not.have.value', 'Jane')

    cy.get('[data-cy="calendar-date"]').contains('27').click();

    // show date into input
    cy.get('[data-cy="input-date"]').should('have.value', '27/01/2000')
    
    
     // Show date selected into log console 
    cy.get('[data-cy="input-date"]').invoke('val').then((selectedDate) => {
      console.log('Selected Date:', selectedDate);
    });
    
  });

  
});
