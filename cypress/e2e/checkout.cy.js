import { faker } from '@faker-js/faker';

describe('Fluxo de checkout', () => {
  
  // Tratamento de exceções não capturadas
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Unexpected token')) {
      return false;
    }
  });

  beforeEach(() => {
    // Aguardar página carregar completamente
    cy.visit('/', { timeout: 30000 });
    cy.window().should('have.property', 'wp'); // Aguarda WordPress carregar
  });

  it('Deve realizar uma compra com sucesso', () => {
    // Login
    cy.fixture('example').then((user) => {
      cy.login(user.email, user.senha);
    });

    // Adicionar produto ao carrinho
    cy.addProductToCart('Abominable Hoodie');
    cy.checkout();

    // Preencher dados de cobrança
    cy.get('#billing_first_name').clear().type(faker.person.firstName());
    cy.get('#billing_last_name').clear().type(faker.person.lastName());
    cy.get('#billing_address_1').clear().type(faker.location.streetAddress());
    cy.get('#billing_city').clear().type(faker.location.city());
    cy.get('#billing_postcode').clear().type('01000-000');
    cy.get('#billing_phone').clear().type(faker.phone.number('11#########'));
    cy.get('#billing_email').clear().type('joao_' + Date.now() + '@teste.com');

    // Finalizar pedido
    cy.get('#place_order').click();

    // Verificar sucesso
    cy.get('.woocommerce-notice', { timeout: 10000 })
      .should('contain', 'Obrigado. Seu pedido foi recebido.');
  });
});