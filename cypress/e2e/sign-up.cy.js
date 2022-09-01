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
        complement: faker.address.secondaryAddress(),
        referenceLocation: faker.random.words(4),
      };
    });

    beforeEach(() => {
      cy.getByData('profile-type-tabs')
        .find('button')
        .first()
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
      cy.signUpUser({ user: student });

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

    it('should NOT sign up with an E-mail that already exists', () => {
      cy.signUpUser({ user: student });
      cy.signUpAddress({ address });

      cy.intercept('POST', '/students').as('saveStudent');

      cy.getByData('finish-button').click();

      cy.wait('@saveStudent').should(({ request, response }) => {
        expect(request.body).to.have.all.keys('student', 'address');
        expect(response.statusCode).to.eq(400);
      });

      cy.getByData('error-snackbar').should('be.visible');
    });

    it('should NOT sign up with a CPF that already exists', () => {
      student = { ...student, email: faker.internet.email() };

      cy.signUpUser({ user: student });
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

  context('Personal Journey', () => {
    let personal = null;
    let address = null;

    before(() => {
      personal = {
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
        // Generated CREFs might not be valid
        cref: `0000${faker.random.numeric(2)}-G/PE`,
      };

      address = {
        zipcode: faker.phone.number('########'),
        street: faker.address.street(),
        neighborhood: faker.address.county(),
        number: faker.address.buildingNumber(),
        state: 'PE',
        city: 'Recife',
        complement: faker.address.secondaryAddress(),
        referenceLocation: faker.random.words(4),
      };
    });

    beforeEach(() => {
      cy.getByData('profile-type-tabs')
        .find('button')
        .last()
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
      cy.signUpUser({ user: personal });

      cy.getByData('signup-stepper')
        .children()
        .last()
        .should('contains.text', 'Endereço');

      cy.signUpAddress({ address });

      cy.intercept('POST', '/personals').as('savePersonal');

      cy.getByData('finish-button').click();

      cy.wait('@savePersonal').should(({ request, response }) => {
        expect(request.body).to.have.all.keys('personal', 'address');

        expect(response.statusCode).to.eq(201);
      });

      cy.location('pathname').should('equal', '/login');
      cy.getByData('success-snackbar').should('be.visible');
    });

    it('should NOT sign up with an E-mail that already exists', () => {
      cy.signUpUser({ user: personal });
      cy.signUpAddress({ address });

      cy.intercept('POST', '/personals').as('savePersonal');

      cy.getByData('finish-button').click();

      cy.wait('@savePersonal').should(({ request, response }) => {
        expect(request.body).to.have.all.keys('personal', 'address');

        expect(response.statusCode).to.eq(400);
      });

      cy.getByData('error-snackbar').should('be.visible');
    });

    it('should NOT sign up with a CPF that already exists', () => {
      personal = { ...personal, email: faker.internet.email() };

      cy.signUpUser({ user: personal });
      cy.signUpAddress({ address });

      cy.intercept('POST', '/personals').as('savePersonal');

      cy.getByData('finish-button').click();

      cy.wait('@savePersonal').should(({ request, response }) => {
        expect(request.body).to.have.all.keys('personal', 'address');

        expect(response.statusCode).to.eq(400);
      });

      cy.getByData('error-snackbar').should('be.visible');
    });

    it('should NOT sign up with a CREF that already exists', () => {
      personal = {
        ...personal,
        email: faker.internet.email(),
        cpf: faker.finance.account(11),
      };

      cy.signUpUser({ user: personal });
      cy.signUpAddress({ address });

      cy.intercept('POST', '/personals').as('savePersonal');

      cy.getByData('finish-button').click();

      cy.wait('@savePersonal').should(({ request, response }) => {
        expect(request.body).to.have.all.keys('personal', 'address');

        expect(response.statusCode).to.eq(400);
      });

      cy.getByData('error-snackbar').should('be.visible');
    });
  });
});
