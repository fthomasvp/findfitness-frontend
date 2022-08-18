/// <reference types="cypress" />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  context('Student form', () => {
    beforeEach(() => {
      //#region Select "ESTUDANTE" profile type
      cy.get('.MuiTabs-flexContainer').within(() => {
        cy.get('button')
          .first()
          .and('have.text', 'ESTUDANTE')
          .click();
      });
      //#endregion

      cy.get('.MuiStepper-root').within(() => {
        cy.get('.MuiStepLabel-labelContainer')
          .first()
          .should('have.text', 'Perfil');
      });

      cy.get('#sPanelActions').within(() => {
        cy.get('button')
          .last()
          .click();
      });
    });

    it('should be able to sign up successfully', () => {
      const student = {
        email: 'fellipecab@gmail.com',
        password: '1234f@',
        birthdate: '1993-09-20',
        cpf: '09735460009',
        name: 'Fellipe Thomás',
        phone: '81987403692',
        gender: 'MASCULINO',
      };

      cy.location('pathname').should('include', 'signup/userform');
      cy.get('.MuiStep-root')
        .first()
        .should('have.class', 'MuiStep-completed');

      //#region Fulfill personal information
      cy.get('.MuiStepper-root').within(() => {
        cy.get('.MuiStepLabel-labelContainer')
          .eq(1)
          .should('have.text', 'Dados pessoais');
      });

      const TEXT_INPUTS = ['name', 'phone', 'cpf', 'email', 'password'];
      TEXT_INPUTS.forEach(item => {
        cy.get(`input[id=${item}]`).type(student[`${item}`]);
      });

      cy.get('.MuiTabs-flexContainer').within(() => {
        cy.get('button')
          .contains(student.gender)
          .click();
      });

      cy.setDatePicker({ id: 'birthdate', date: student.birthdate });

      cy.get('.MuiDialogActions-root').within(() => {
        cy.get('button')
          .last()
          .click();
      });

      cy.get('button[type=submit]').click();
      //#endregion

      cy.location('pathname').should('include', 'signup/addressform');
      cy.get('.MuiStep-root')
        .eq(1)
        .should('have.class', 'MuiStep-completed');

      //#region Fulfill address information
      cy.get('.MuiStepper-root').within(() => {
        cy.get('.MuiStepLabel-labelContainer')
          .last()
          .should('have.text', 'Endereço');
      });

      cy.get('button[type=submit]').click();
      //#endregion
    });
  });

  context.skip('Personal form', () => {
    beforeEach(() => {
      //#region Select "PERSONAL" profile type
      cy.get('.MuiTabs-flexContainer').within(() => {
        cy.get('button')
          .last()
          .and('have.text', 'PERSONAL')
          .click();
      });
      //#endregion
    });
  });
});
