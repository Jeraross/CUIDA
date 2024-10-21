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

Cypress.Commands.add('viewPatients', () => {
    cy.get('[href="/pacientes/"] > .homebutton').click();
});

Cypress.Commands.add('search', (name) => {
    cy.get('#searchInput').clear().type(name); // Limpa o campo antes de digitar
    cy.get('#searchInput').type('{enter}'); // Pressiona Enter para pesquisar, se necessário
});

describe('User flow', () => {
    it('should delete all users, create a new user, login, and search for a patient', () => {
        cy.deleteAllUsers();

        cy.visit('/');

        cy.switchToRegister();

        cy.createUser('testuser', 'testuser@example.com', 'password123');

        cy.login('testuser', 'password123');

        cy.viewPatients();

        const nomePaciente = 'Guilherme Mourão';

        cy.search(nomePaciente);

        // Verifica se o paciente aparece na lista após a pesquisa
        cy.contains(nomePaciente).should('exist'); // Verifica se o nome do paciente está na página
    });
});
