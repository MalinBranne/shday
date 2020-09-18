/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
   cy.server();
   // TODO: Show stubbed and end-to-end. (before e2e check db)
   cy.route({ method: 'POST', url: '/api/comments', response: { status: 201 } }).as('postComment');
});

Given(/^the backend response contains data$/, () => {
    cy.route({ method: 'GET', url: '/api/comments', response: 'fixture:shday_data.json' }).as('fetchComments');
});

Given(/^the backend response contains no data$/, () => {
    cy.route({ method: 'GET', url: '/api/comments', response: []}).as('fetchComments');
});

When(/^the user arrives to the application$/, () => {
   cy.visit('/');
   cy.wait('@fetchComments');
});

Then(/^a welcome message should be visible$/, () => {
    cy.contains('Cypress is good !').should('exist');
});

Then(/^the text "([^"]*)" should be visible$/, (text) => {
    cy.contains(text).should('exist');
});

When(/^the user clicks the button$/, () => {
    cy.get('[data-test-id=button]').click();
});

When(/^the user clicks the "([^"]*)" button$/, (button) => {
    cy.get(`[data-test-id=${button}]`).click();
});

Then(/^the welcome message css "([^"]*)" is "([^"]*)"$/, (cssProp, value) => {
    cy.get('[data-test-id=text').should('have.css', cssProp, value);
});

Then(/^the text "([^"]*)" should "([^"]*)"$/, (text, existOrNotExist) => {
    cy.contains(text).should(existOrNotExist);
});

When(/^the user types a new comment$/, () => {
    cy.get('[data-test-id=nameInput]').type('Johan L');
    cy.get('[data-test-id=commentInput]').type('I <3 Softhouse');
});

Then(/^the new comment should be visible$/, () => {
    cy.wait('@postComment');
    cy.get('[data-test-id=nameInput]').should('have.value', '');
    cy.get('[data-test-id=commentInput]').should('have.value', '');
    cy.contains("I <3 Softhouse").should('exist');
});
