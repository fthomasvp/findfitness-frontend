// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
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

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(password);

  cy.get('button[type=submit]').click();
});

Cypress.Commands.add('setDatePicker', (id, date) => {
  const [year, month, day] = date.split('-');

  cy.get(`input[id=${id}]`).click();

  //#region Select the year
  cy.get('.MuiPickersDatePickerRoot-toolbar').within(() => {
    cy.get('button')
      .first()
      .click();
  });

  cy.get('.MuiPickersYearSelection-container')
    .contains(year)
    .click();
  //#endregion

  //#region Select the month
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
  //#endregion

  //#region Select the day
  cy.get('.MuiPickersCalendar-week')
    .contains(Number(day))
    .click();
  //#endregion
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
