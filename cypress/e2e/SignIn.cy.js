/// <reference types="cypress" />

describe('Sign In page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should NOT login with empty credentials', () => {
    cy.getByData('submit-button').click();

    cy.get('#email-helper-text').should('exist');
    cy.get('#password-helper-text').should('exist');
  });

  it('should NOT login with incorrect credentials', () => {
    const { email, password } = {
      email: 'fellipecab@gmail.com',
      password: 'Wr0ng@',
    };

    cy.login(email, password);

    cy.getByData('error-snackbar').should('be.visible');
  });

  it('should navigate to Sign Up page', () => {
    cy.get('a[href="/signup"]').click();

    cy.location('pathname').should('equal', '/signup/profileform');
  });

  it('should be able to login successfully', () => {
    const { email, password } = {
      email: 'fellipecab@gmail.com',
      password: '1234f@',
    };

    cy.login(email, password);

    cy.location('pathname').should('equal', '/home');
  });
});
