/* eslint-disable no-undef */
import React from "react";
import DatePicker from "./datePicker";
import Calendar from "../Calendar/calendar";
import { formatDate } from "../../utils/modelisation";

describe("<DatePicker />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DatePicker />);
  });
  it("click and selected date value", () => {
    // DatePicker component
    cy.mount(<DatePicker />);

    // input was empty
    cy.get(".input-date").should("have.value", "");

    // click to input
    cy.get(".input-date").click();

    // Show Calendar component
    cy.mount(<Calendar />);

    // onSelect date month
    cy.get("select#calendar__month").select("0");
    cy.get("select#calendar__month option:selected").should(
      "have.text",
      "January"
    );

    // onSelect date year
    cy.get("select#calendar__year").select("2000");
    cy.get("select#calendar__year option:selected").should(
      "have.value",
      "2000"
    );

    // onSelect date day
    cy.get('[data-cy="calendar-date"]').should('not.have.value', 'Jane')
    cy.get('[data-cy="calendar-date"]').eq(27).click();



    

    cy.get('[data-cy="input-date"]').invoke('val').then((selectedDate) => {
      console.log('Selected Date:', selectedDate);
    });

    cy.window().should('have.property', 'selectedDate').and('not.be.null');

    // const expectedDate = cy.get('[data-cy=".input-date"]');
    //   cy.log(formatDate(expectedDate))
    
  });
});
