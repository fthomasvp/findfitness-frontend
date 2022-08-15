/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to sign up a student successfully', () => {
    const { email, password } = {
      email: 'fellipecab@gmail.com',
      password: '1234f@',
    };

    cy.get('a[href="/signup"]').click();

    cy.location('pathname').should('include', 'signup');

    // Selecionar "Estudante"
    // Preencher informações pessoais corretamente
    // Preencher informações do endereço corretamente
    // Finalizar cadastro
  });
});
