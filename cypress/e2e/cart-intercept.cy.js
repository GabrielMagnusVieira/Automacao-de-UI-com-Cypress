describe('Intercept de Carrinho', () => {
  
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Unexpected token')) {
      return false;
    }
  });

  beforeEach(() => {
    cy.setCookie('ebacStoreVersion', 'v2');
    cy.visit('/', { timeout: 30000 });
  });

  it('Deve adicionar item ao carrinho e validar resposta', () => {
    cy.intercept('POST', '**/wc/store/v1/cart/add-item').as('addItem');
    
    cy.visit('/produtos/');
    cy.contains('Abominable Hoodie').click();
    cy.get('.single_add_to_cart_button').click();
    
    cy.wait('@addItem').its('response.statusCode').should('eq', 200);
    cy.getCookie('woocommerce_cart_hash').should('exist');
  });

  it('Deve atualizar quantidade do item no carrinho', () => {
    cy.intercept('POST', '**/wc/store/v1/cart/update-item').as('updateItem');
    
    cy.visit('/carrinho/');
    cy.get('input.qty').clear().type('2');
    cy.get('button[name="update_cart"]').click();
    
    cy.wait('@updateItem').its('response.statusCode').should('eq', 200);
  });

  it('Deve remover item do carrinho', () => {
    cy.intercept('POST', '**/wc/store/v1/cart/remove-item').as('removeItem');
    
    cy.visit('/carrinho/');
    cy.get('.remove').click();
    
    cy.wait('@removeItem').its('response.statusCode').should('eq', 200);
    cy.get('.cart-empty').should('contain', 'Seu carrinho está vazio');
  });
});
