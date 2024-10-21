// Comando para deletar todos os usuários usando um script Python
Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false });
});

// Comando para realizar login
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/cadastro/login');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="senha"]').type(password);
    cy.get('input[type="submit"]').click();
});

// Comando para criar um novo usuário
Cypress.Commands.add('createUser', (username, email, password) => {
    cy.visit('/');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="senha"]').type(password);
    cy.get('input[type="submit"]').click();
});

// Comando para alternar para a tela de login
Cypress.Commands.add('switchToLogin', () => {
    cy.get('#login').click();
});

// Comando para alternar para a tela de cadastro
Cypress.Commands.add('switchToRegister', () => {
    cy.get('#register').click();
});

// Exemplo de fluxo completo de deletar usuários, cadastrar um novo e fazer login
describe('User flow', () => {
    it('should delete all users, create a new user, and login', () => {
        // Deleta todos os usuários
        cy.deleteAllUsers();

        // Alterna para o formulário de cadastro
        cy.switchToRegister();

        // Cria um novo usuário
        cy.createUser('testuser', 'testuser@example.com', 'password123');

        // Alterna para o formulário de login
        cy.switchToLogin();

        // Faz login com o novo usuário
        cy.login('testuser', 'password123');
    });
});
