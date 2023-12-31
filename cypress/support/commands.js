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

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(response => {
    localStorage.setItem('loggedInUser', JSON.stringify(response.body))
    cy.visit('http://localhost:5173')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/blogs`,
    body: { title, author, url, likes },
    headers: { Authorization: `Bearer ${loggedInUser.token}` }
  })
  cy.visit('http://localhost:5173')
})

Cypress.Commands.add('createUser', ({ name, username, password  }) => {
  const user = { name, username, password }
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  cy.visit('http://localhost:5173')
})