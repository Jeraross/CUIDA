Cypress.Commands.add('deletePatient', (cpf) => {
    cy.exec(`python delete_patient.py ${cpf}`, { failOnNonZeroExit: false });
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

Cypress.Commands.add('accessForm', () => {
    cy.get('[href="/form/"] > .homebutton').click();
});

Cypress.Commands.add('createPatient', (nome, idade, cpf, numero_celular, numero_prontuario, sexo, status) => {
    cy.get('#nome').type(nome);
    cy.get('#idade').type(idade);
    cy.get('#cpf').type(cpf);
    cy.get('#numero_celular').type(numero_celular);
    cy.get('#numero_prontuario').type(numero_prontuario);
    cy.get('#sexo').select(sexo);
    cy.get('#status').select(status);
    cy.get('.btn').click();
});

describe('User flow and Patient Registration', () => {
    it('should delete the specific patient, login, and register a new patient', () => {
        const testUsername = 'testuser';
        const cpfToDelete = '12345678909'; 

        cy.deletePatient(cpfToDelete);

        cy.login(testUsername, 'password123');

        cy.accessForm();

        const nome = 'Guilherme Mourão';
        const idade = '30';
        const cpf = cpfToDelete;
        const numero_celular = '81989468836';
        const numero_prontuario = '20230002';
        const sexo = 'M';
        const status = 'NÃO ATENDIDO';

        cy.createPatient(nome, idade, cpf, numero_celular, numero_prontuario, sexo, status);

        cy.url().should('include', '/home');

        cy.get('[href="/pacientes/"] > .homebutton').click();

        cy.contains(nome).should('exist');
    });
});