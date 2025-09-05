class CreateAccountPage {
  visit() {
    cy.visit('/minha-conta/');
  }

  fillEmail(email) {
    cy.get('#reg_email').type(email);
  }

  fillPassword(password) {
    cy.get('#reg_password').type(password);
  }

  submit() {
    cy.get('[name="register"]').click();
  }

  validateAccountCreation() {
    cy.get('.woocommerce-MyAccount-navigation-link--dashboard')
      .should('be.visible');
  }
}

export default new CreateAccountPage();