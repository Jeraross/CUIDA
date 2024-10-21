Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get('.sign_in form').within(() => {
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="senha"]').type(password);
        cy.get('input[type="submit"]').click();
    });
});

Cypress.Commands.add('createUser', (username, email, password) => {
    cy.visit('/');
    cy.switchToRegister();
    cy.get('.sign_up form').within(() => {
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="senha"]').type(password);
        cy.get('input[type="submit"]').click();
    });
});

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


describe('User flow', () => {
    it('should delete all users, create a new user, and login', () => {
        cy.deleteAllUsers();

        cy.visit('/')

        cy.switchToRegister();

        cy.createUser('testuser', 'testuser@example.com', 'password123');

        cy.login('testuser', 'password123');

    });
});
