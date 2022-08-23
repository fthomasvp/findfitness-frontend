const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

Cypress.Commands.add('getByData', selector =>
  cy.get(`[data-test=${selector}]`)
);

Cypress.Commands.add('login', (email, password) => {
  cy.getByData('email-input').type(email);
  cy.getByData('password-input').type(password);

  cy.intercept('POST', '/login').as('login');

  cy.getByData('login-button').click();
});

Cypress.Commands.add('setSelectInput', ({ selector, value }) => {
  cy.getByData(selector).click();

  cy.get(`[data-test="menu-${selector}"] > .MuiPaper-root`)
    .contains(value)
    .click();
});

Cypress.Commands.add('setDatePicker', ({ selector, date }) => {
  const [year, month, day] = date.split('-');

  cy.getByData(selector).click();

  // Select the year
  cy.get('.MuiPickersDatePickerRoot-toolbar').within(() => {
    cy.get('button')
      .first()
      .click();
  });

  cy.get('.MuiPickersYearSelection-container')
    .contains(year)
    .click();

  // Select the month
  cy.get('.MuiPickersCalendarHeader-switchHeader').within(() => {
    let currentMonthNumber = 0;

    cy.get('div')
      .invoke('text')
      .then(text => {
        const [monthText] = text.split(' ');

        currentMonthNumber = MONTHS.findIndex(item => item === monthText) + 1;

        if (Number(month) !== currentMonthNumber) {
          const monthDiff = Number(month) - currentMonthNumber;

          if (monthDiff > 0) {
            for (let index = 0; index < monthDiff; index++) {
              cy.get('button')
                .last()
                .click();
            }
          }

          if (monthDiff < 0) {
            for (let index = 0; index < Math.abs(monthDiff); index++) {
              cy.get('button')
                .first()
                .click();
            }
          }
        }
      });
  });

  // Select the day
  cy.get('.MuiPickersCalendar-transitionContainer')
    .find('button[tabindex=0]')
    .contains(Number(day))
    .click();
});

Cypress.Commands.add('signUpStudent', ({ student }) => {
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
  cy.intercept('GET', '/localizations/states/*/cities').as('getCitiesByState');

  cy.getByData('next-button').click();

  cy.location('pathname').should('equal', '/signup/addressform');
  cy.getByData('signup-stepper')
    .children()
    .eq(1)
    .should('have.class', 'MuiStep-completed');
});

Cypress.Commands.add('signUpAddress', ({ address }) => {
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
});
