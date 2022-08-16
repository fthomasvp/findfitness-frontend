/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should be able to sign up a student successfully', () => {
    const { email, password, birthdate, cpf, name, phone, gender } = {
      email: 'fellipecab@gmail.com',
      password: '1234f@',
      birthdate: '1993-09-20',
      cpf: '09735460009',
      name: 'Fellipe Thomás',
      phone: '81987403692',
      gender: 'MASCULINO',
    };

    //#region Select "ESTUDANTE" profile type
    cy.get('.MuiTabs-flexContainer').within(() => {
      cy.get('button')
        .first()
        .and('have.text', 'ESTUDANTE')
        .click();
    });
    //#endregion

    cy.get('#sPanelActions').within(() => {
      cy.get('button')
        .last()
        .click();
    });

    cy.location('pathname').should('include', 'signup/userform');

    // Fulfill personal information correctly
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="phone"]').type(phone);
    cy.get('input[id="cpf"]').type(cpf);

    cy.get('.MuiTabs-flexContainer').within(() => {
      cy.get('button')
        .contains(gender)
        .click();
    });

    // Create an command to update birthdate input
    cy.setDatePicker('birthdate', birthdate);

    cy.get('.MuiDialogActions-root').within(() => {
      cy.get('button')
        .last()
        .click();
    });

    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);

    cy.get('button[type=submit]').click();

    // Fulfill address information correctly
    cy.location('pathname').should('include', 'signup/addressform');

    // Finish sign up process
    cy.get('button[type=submit]').click();
  });
});
