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
    cy.get('#searchInput').clear().type(name);
    cy.get('#searchInput').type('{enter}');
});

describe('User flow', () => {
    it('Deve deletar todos os usuários, criar um novo usuário, fazer login, e procurar por um paciente (paciente procurado deve ser exibido).', () => {
        cy.deleteAllUsers();

        cy.visit('/');

        cy.switchToRegister();

        cy.createUser('testuser', 'testuser@example.com', 'password123');

        cy.login('testuser', 'password123');

        cy.viewPatients();

        const nomePaciente = 'Guilherme Mourão';

        cy.search(nomePaciente);

        cy.contains(nomePaciente).should('exist');
    });
});

describe('User flow', () => {
    it('Deve deletar todos os usuários, criar um novo usuário, fazer login, e exibir um erro ao procurar por um paciente não existente.', () => {
        cy.deleteAllUsers();

        cy.visit('/');

        cy.switchToRegister();

        cy.createUser('testuser', 'testuser@example.com', 'password123');

        cy.login('testuser', 'password123');

        cy.viewPatients();

        const nomePaciente = 'Paciente';

        cy.search(nomePaciente);

        cy.get('#notFoundMessage').should('exist');

    });
});
