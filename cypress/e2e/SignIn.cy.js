/// <reference types="cypress" />

describe('Sign In page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should NOT login with empty credentials', () => {
    cy.getByData('email-input').clear();
    cy.getByData('password-input').clear();

    cy.getByData('login-button').click();

    cy.get('#email-helper-text').should('exist');
    cy.get('#password-helper-text').should('exist');
  });

  it('should NOT login with incorrect credentials', () => {
    const { email, password } = {
      email: 'fellipecab@gmail.com',
      password: 'Wr0ng@',
    };

    cy.login(email, password);

    // TODO: check if sign in request was made.

    cy.get('#email-helper-text').should('not.exist');
    cy.get('#password-helper-text').should('not.exist');

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

    // TODO: check if sign in request was made.

    cy.get('#email-helper-text').should('not.exist');
    cy.get('#password-helper-text').should('not.exist');

    cy.location('pathname').should('equal', '/home');
  });
});
