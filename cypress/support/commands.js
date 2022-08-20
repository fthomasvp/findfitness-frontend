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
