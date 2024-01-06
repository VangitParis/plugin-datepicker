/* eslint-disable no-undef */
import React from "react";
import DatePickerInput from "./datePickerInput";

describe("<DatePickerInput />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DatePickerInput />);

    // input was empty
    cy.get(".input-date").should("have.value", "");
  });
});
