/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  context('Student Journey', () => {
    let student = null;
    let address = null;

    before(() => {
      student = {
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

      address = {
        zipcode: faker.phone.number('########'),
        street: faker.address.street(),
        neighborhood: faker.address.county(),
        number: faker.address.buildingNumber(),
        state: 'PE',
        city: 'Recife',
      };
    });

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

      cy.getByData('signup-stepper')
        .children()
        .eq(1)
        .should('contains.text', 'Dados pessoais');
    });

    it('should be able to sign up successfully', () => {
      cy.signUpStudent({ student });

      cy.getByData('signup-stepper')
        .children()
        .last()
        .should('contains.text', 'Endereço');

      cy.signUpAddress({ address });

      cy.intercept('POST', '/students').as('saveStudent');

      cy.getByData('finish-button').click();

      cy.wait('@saveStudent').should(({ request, response }) => {
        expect(request.body).to.have.all.keys('student', 'address');
        expect(response.statusCode).to.eq(201);
      });

      cy.location('pathname').should('equal', '/login');
      cy.getByData('success-snackbar').should('be.visible');
    });

    it('should NOT sign up with an email that already exists', () => {
      cy.signUpStudent({ student });
      cy.signUpAddress({ address });

      cy.intercept('POST', '/students').as('saveStudent');

      cy.getByData('finish-button').click();

      cy.wait('@saveStudent').should(({ request, response }) => {
        expect(request.body).to.have.all.keys('student', 'address');
        expect(response.statusCode).to.eq(400);
      });

      cy.getByData('error-snackbar').should('be.visible');
    });
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
