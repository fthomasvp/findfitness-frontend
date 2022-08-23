/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

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
        email: faker.internet.email(),
        password: '1234f@',
        birthdate: faker.date
          .birthdate()
          .toISOString()
          .split('T')[0],
        cpf: faker.finance.account(11),
        name: faker.name.fullName(),
        phone: faker.phone.number('55#########'),
        gender: 'MASCULINO',
      };
      const address = {
        zipcode: faker.phone.number('########'),
        street: faker.address.street(),
        neighborhood: faker.address.county(),
        number: faker.address.buildingNumber(),
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

      cy.intercept('GET', '/localizations/states').as('getStates');
      cy.intercept('GET', '/localizations/states/*/cities').as(
        'getCitiesByState'
      );

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

      cy.wait('@getStates').should(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body)
          .to.be.an('array')
          .and.length.to.be.greaterThan(1);
        expect(response.body[0]).to.have.all.keys('id', 'initials', 'name');
      });

      const addressTextInputs = ['zipcode', 'street', 'neighborhood', 'number'];
      addressTextInputs.forEach(item => {
        cy.getByData(`${item}-input`).type(address[`${item}`]);
      });

      cy.setSelectInput({ selector: 'state-input', value: address.state });

      cy.wait('@getCitiesByState').should(({ response }) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body)
          .to.be.an('array')
          .and.length.to.be.greaterThan(1);
        expect(response.body[0]).to.have.all.keys('id', 'name');
      });

      cy.setSelectInput({ selector: 'city-input', value: address.city });

      cy.intercept('POST', '/students').as('saveStudent');

      cy.getByData('finish-button').click();

      cy.wait('@saveStudent').should(({ request, response }) => {
        expect(request.body).to.have.all.keys('student', 'address');
        expect(response.statusCode).to.eq(201);
      });
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
