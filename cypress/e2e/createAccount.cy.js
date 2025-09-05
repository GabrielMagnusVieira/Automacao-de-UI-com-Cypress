import CreateAccountPage from '../support/pageObjects/CreateAccountPage';

describe('Fluxo de criação de conta', () => {
  it('Deve criar uma nova conta com sucesso', () => {
    const email = `usuario_${Date.now()}@teste.com`;
    const senha = 'GD*peToHNJ1#c$sgk08EaYJQ';

    CreateAccountPage.visit();
    CreateAccountPage.fillEmail(email);
    CreateAccountPage.fillPassword(senha);
    CreateAccountPage.submit();
    CreateAccountPage.validateAccountCreation();
  });
});