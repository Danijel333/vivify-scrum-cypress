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
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
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

// -- function that walidates page url--
Cypress.Commands.add('validatePageUrl', (matchingString) => {
    cy.url().should('include', matchingString);
});

//-- function that validates page header--

Cypress.Commands.add('validatePageHeader', (matchingString) => {
    cy.get('h1').should('have.text', matchingString);
})

Cypress.Commands.add('generateFixture', () => {
    const { faker } = require('@faker-js/faker')

    cy.writeFile('cypress/fixtures/faker.json', {
        'Title': faker.name.firstName(),
        'Email' : faker.internet.email(),
        'Address' : faker.address.streetAddress()
    })
})

// -- function for logging in using backend --

Cypress.Commands.add('backendLogging',(email, password) => {
    // cy.intercept({
    //     method : 'POST',
    //     url : '**/login'
    // }).as('sucessfullLogin');

    cy.request({
        method : 'POST',
        url : `${Cypress.env('baseAPI')+'login'}`,
        body : {
            email : email,
            password : password
        }
    }).its('body').then(response => {
        window.localStorage.setItem('user_id', response.user.id);
        window.localStorage.setItem('user', JSON.stringify(response.user));
        window.localStorage.setItem('token', response.token);
    })

    // cy.wait('@sucessfullLogin').then(interception => {
    //     console.log(interception.response)
    // })
})