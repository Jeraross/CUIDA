// Comando para deletar todos os usuários usando um script Python
Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false });
});

// Comando para realizar login
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get('.sign_in form').within(() => { // Seleciona o formulário de login especificamente
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="senha"]').type(password);
        cy.get('input[type="submit"]').click();
    });
});

// Comando para criar um novo usuário
Cypress.Commands.add('createUser', (username, email, password) => {
    cy.visit('/');
    cy.switchToRegister(); // Garante que está na tela de cadastro
    cy.get('.sign_up form').within(() => { // Seleciona o formulário de cadastro especificamente
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="senha"]').type(password);
        cy.get('input[type="submit"]').click();
    });
});

// Comando para alternar para a tela de cadastro
Cypress.Commands.add('switchToRegister', () => {
    cy.get('#register').click();
});

Cypress.Commands.add('createPatient', (nome, idade, cpf, numero_celular, numero_prontuario, sexo, status) => {
    cy.visit('/add');
    cy.get('input[name="nome"]').type(nome);
    cy.get('input[name="idade"]').type(idade);
    cy.get('input[name="cpf"]').type(cpf);
    cy.get('input[name="numero_celular"]').type(numero_celular);
    cy.get('input[name="numero_prontuario"]').type(numero_prontuario);
    cy.get('select[name="sexo"]').select(sexo);
    cy.get('select[name="status"]').select(status);
    cy.get('button[type="submit"]').click();
});


// Exemplo de fluxo completo de deletar usuários, cadastrar um novo e fazer login
describe('User flow', () => {
    it('should delete all users, create a new user, and login', () => {
        // Deleta todos os usuários
        cy.deleteAllUsers();

        cy.visit('/')
        // Alterna para o formulário de cadastro
        cy.switchToRegister();

        // Cria um novo usuário
        cy.createUser('testuser', 'testuser@example.com', 'password123');

        // Faz login com o novo usuário
        cy.login('testuser', 'password123');


    });
});
