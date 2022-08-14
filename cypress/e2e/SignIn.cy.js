/// <reference types="cypress" />

describe('Sign In', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not login without credentials', () => {
    cy.get('button[type=submit]').click();

    cy.get('#email-helper-text').should('be.visible');
    cy.get('#password-helper-text').should('be.visible');
  });

  it('should not login with incorrect credentials', () => {
    const { email, password } = {
      email: 'fellipecab@gmail.com',
      password: 'Wr0ng@',
    };

    cy.login(email, password);

    cy.get('.MuiAlert-message').should('be.visible');
  });

  it('should be able to login successfully', () => {
    const { email, password } = {
      email: 'fellipecab@gmail.com',
      password: '1234f@',
    };

    cy.login(email, password);

    cy.location('pathname').should('include', 'home');
  });
});
