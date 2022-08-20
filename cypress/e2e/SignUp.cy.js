/// <reference types="cypress" />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  context('Student Journey', () => {
    beforeEach(() => {
      cy.getByData('profile-type-tabs')
        .find('button')
        .contains('ESTUDANTE')
        .click();

      cy.getByData('signup-stepper')
        .children()
        .first()
        .should('contains.text', 'Perfil');

      cy.getByData('next-button').click();

      cy.location('pathname').should('equal', '/signup/userform');
      cy.getByData('signup-stepper')
        .children()
        .first()
        .should('have.class', 'MuiStep-completed');
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

      //#region Fulfill student information
      cy.getByData('signup-stepper')
        .children()
        .eq(1)
        .should('contains.text', 'Dados pessoais');

      const studentTextInputs = ['name', 'phone', 'cpf', 'email', 'password'];
      studentTextInputs.forEach(item => {
        cy.getByData(`${item}-input`).type(student[`${item}`]);
      });

      cy.getByData('gender-tabs')
        .find('button')
        .contains(student.gender)
        .click();

      cy.setDatePicker({
        selector: 'birthdate-input',
        date: student.birthdate,
      });

      cy.get('.MuiDialogActions-root').within(() => {
        cy.get('button')
          .last()
          .click();
      });

      cy.getByData('next-button').click();
      //#endregion

      cy.location('pathname').should('equal', '/signup/addressform');
      cy.getByData('signup-stepper')
        .children()
        .eq(1)
        .should('have.class', 'MuiStep-completed');

      //#region Fulfill address information
      cy.getByData('signup-stepper')
        .children()
        .last()
        .should('contains.text', 'Endereço');

      // TODO: check if request to get all states was made.

      const addressTextInputs = ['zipcode', 'street', 'neighborhood', 'number'];
      addressTextInputs.forEach(item => {
        cy.getByData(`${item}-input`).type(address[`${item}`]);
      });

      cy.setSelectInput({ selector: 'state-input', value: 'PE' });

      // TODO: check if request to get cities by state was made.

      cy.setSelectInput({ selector: 'city-input', value: 'Recife' });

      cy.getByData('finish-button').click();
      //#endregion

      cy.location('pathname').should('equal', '/login');
      cy.getByData('success-snackbar').should('be.visible');
    });

    it.skip('should NOT sign up with an email that already exists', () => {});
  });

  context.skip('Personal Journey', () => {
    beforeEach(() => {
      cy.getByData('profile-type-tabs')
        .find('button')
        .contains('PERSONAL')
        .click();

      cy.getByData('signup-stepper')
        .children()
        .first()
        .should('contains.text', 'Perfil');

      cy.getByData('next-button').click();
    });
  });
});
