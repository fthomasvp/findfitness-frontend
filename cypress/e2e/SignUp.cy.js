/// <reference types="cypress" />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  context('Student Journey', () => {
    beforeEach(() => {
      cy.getByData('profileType-tabs')
        .find('button[role="tab"]')
        .first()
        .and('have.text', 'ESTUDANTE')
        .click();

      cy.getByData('signup-stepper').within(() => {
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
      const address = {
        zipcode: '52051395',
        street: 'Rua da Harmonia',
        neighborhood: 'Casa Amarela',
        number: '305',
        state: 'PE',
        city: 'Recife',
      };

      cy.location('pathname').should('equal', '/signup/userform');
      cy.get('.MuiStep-root')
        .first()
        .should('have.class', 'MuiStep-completed');

      //#region Fulfill student information
      cy.getByData('signup-stepper').within(() => {
        cy.get('.MuiStepLabel-labelContainer')
          .eq(1)
          .should('have.text', 'Dados pessoais');
      });

      const studentTextInputs = ['name', 'phone', 'cpf', 'email', 'password'];
      studentTextInputs.forEach(item => {
        cy.getByData(`${item}-input`).type(student[`${item}`]);
      });

      cy.get('.MuiTabs-flexContainer').within(() => {
        cy.get('button')
          .contains(student.gender)
          .click();
      });

      cy.setDatePicker({
        selector: 'birthdate-input',
        date: student.birthdate,
      });

      cy.get('.MuiDialogActions-root').within(() => {
        cy.get('button')
          .last()
          .click();
      });

      cy.get('button[type=submit]').click();
      //#endregion

      cy.location('pathname').should('equal', '/signup/addressform');
      cy.get('.MuiStep-root')
        .eq(1)
        .should('have.class', 'MuiStep-completed');

      //#region Fulfill address information
      cy.getByData('signup-stepper').within(() => {
        cy.get('.MuiStepLabel-labelContainer')
          .last()
          .should('have.text', 'Endereço');
      });

      // TODO: check if request to get all states was made.

      const addressTextInputs = ['zipcode', 'street', 'neighborhood', 'number'];
      addressTextInputs.forEach(item => {
        cy.getByData(`${item}-input`).type(address[`${item}`]);
      });

      cy.setSelectInput({ selector: 'state-input', value: 'PE' });

      // TODO: check if request to get cities by state was made.

      cy.setSelectInput({ selector: 'city-input', value: 'Recife' });

      // cy.get('button[type=submit]').click();
      //#endregion
    });
  });

  context.skip('Personal Journey', () => {
    beforeEach(() => {
      cy.getByData('profileType-tabs')
        .find('button[role="tab"]')
        .last()
        .and('have.text', 'PERSONAL')
        .click();

      cy.getByData('signup-stepper').within(() => {
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
  });
});
