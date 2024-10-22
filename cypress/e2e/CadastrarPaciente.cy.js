Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('deletePatient', (cpf) => {
    cy.exec(`python delete_patient.py ${cpf}`, { failOnNonZeroExit: false });
});

Cypress.Commands.add('switchToRegister', () => {
    cy.get('#register').click();
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
    it('Deve deletar todos os usuários, criar um novo usuário, fazer login, deletar o paciente específico, e cadastrar um novo paciente.', () => {
        const cpfToDelete = '12345678909'; 

        cy.deletePatient(cpfToDelete);

        cy.deleteAllUsers();

        cy.visit('/')

        cy.switchToRegister();

        cy.createUser('testuser', 'testuser@example.com', 'password123');

        cy.login('testuser', 'password123');

        cy.accessForm();

        const nome = 'Guilherme Mourão';
        const idade = '20';
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

describe ('User flow and Patient Registration: Error 1', () => {
    it('Deve deletar todos os usuários, criar um novo usuário, fazer login, deletar o paciente específico, e exibir uma mensagem de erro quando o usuário tentar cadastrar um paciente com o mesmo CPF.', () => {

        cy.deleteAllUsers();

        cy.visit('/')

        cy.switchToRegister();

        cy.createUser('testuser', 'testuser@example.com', 'password123');

        cy.login('testuser', 'password123');

        cy.accessForm();

        const nome = 'Guilherme Mourão';
        const idade = '20';
        const cpf = '12345678909';
        const numero_celular = '81989468836';
        const numero_prontuario = '20230003';
        const sexo = 'M';
        const status = 'NÃO ATENDIDO';

        cy.createPatient(nome, idade, cpf, numero_celular, numero_prontuario, sexo, status);

        cy.get('.alert').should('exist');
    });
});

describe ('User flow and Patient Registration: Error 2', () => {
    it('Deve deletar todos os usuários, criar um novo usuário, fazer login, deletar o paciente específico, e exibir uma mensagem de erro quando o usuário tentar cadastrar um paciente com o mesmo número de prontuário.', () => {

        cy.deleteAllUsers();

        cy.visit('/')

        cy.switchToRegister();

        cy.createUser('testuser', 'testuser@example.com', 'password123');

        cy.login('testuser', 'password123');

        cy.accessForm();

        const nome = 'Jeronimo Rossi';
        const idade = '20';
        const cpf = '98765432100.';
        const numero_celular = '81989468836';
        const numero_prontuario = '20230002';
        const sexo = 'M';
        const status = 'NÃO ATENDIDO';

        cy.createPatient(nome, idade, cpf, numero_celular, numero_prontuario, sexo, status);

        cy.get('.alert').should('exist');
    });
});