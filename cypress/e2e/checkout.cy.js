describe('Fluxo de Checkout', () => {
  it('Deve realizar uma compra com sucesso', () => {
    cy.fixture('example').then((user) => {
      cy.login(user.email, user.senha);
    });

    cy.addProductToCart('Abominable Hoodie');
    cy.checkout();

    // preencher dados de cobrança
    cy.get('#billing_first_name').type('João');
    cy.get('#billing_last_name').type('Silva');
    cy.get('#billing_address_1').type('Rua Teste, 123');
    cy.get('#billing_city').type('São Paulo');
    cy.get('#billing_postcode').type('01000-000');
    cy.get('#billing_phone').type('11999999999');
    cy.get('#billing_email').type(`joao_${Date.now()}@teste.com`);

    cy.get('#place_order').click();

    // validação
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.');
  });
});