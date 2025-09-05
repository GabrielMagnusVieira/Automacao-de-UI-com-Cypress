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

Cypress.Commands.add('login', (user, password) => {
  cy.visit('/minha-conta/');
  cy.get('#username').type(user);
  cy.get('#password').type(password);
  cy.get('[name="login"]').should('be.visible').click();
});

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.visit('/produtos/');
  cy.contains(productName).click();

  
  cy.get('body').then(($body) => {
    if ($body.find('select#pa_size').length) {
      cy.get('select#pa_size').select('L');   // escolhe tamanho
    }
    if ($body.find('select#pa_color').length) {
      cy.get('select#pa_color').select('Red'); // escolhe cor
    }
  });

  cy.get('.single_add_to_cart_button').click();
});

Cypress.Commands.add('checkout', () => {
  cy.get('body').then(($body) => {
    if ($body.find('a:contains("Ver carrinho")').length) {
      cy.contains('Ver carrinho').click();
    } else {
      cy.visit('/carrinho/');
    }
  });

  cy.get('.checkout-button').click();
});
