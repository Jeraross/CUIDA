// Comando para excluir todos os pacientes
Cypress.Commands.add('deleteAllPatients', () => {
    cy.exec('python delete_all_patients.py', { failOnNonZeroExit: false });
});

// Comando para fazer login
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get('.sign_in form').within(() => {
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="senha"]').type(password);
        cy.get('input[type="submit"]').click();
    });
});

// Comando para criar um novo usuário
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

// Comando para acessar o formulário de cadastro de pacientes
Cypress.Commands.add('accessForm', () => {
    cy.get('[href="/form/"] > .homebutton').click();
});

// Comando para criar um novo paciente
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

// Descrição do fluxo de usuário e cadastro de pacientes
describe('User flow and Patient Registration', () => {
    it('should delete all patients, login, and register a new patient', () => {
        const testUsername = 'testuser';
        const nome = 'Guilherme Mourão';
        const idade = '30';
        const cpf = '12345678909'; // CPF válido
        const numero_celular = '81989468836';
        const numero_prontuario = '20230001';
        const sexo = 'M'; // Masculino
        const status = 'NÃO ATENDIDO';

        // Exclui todos os pacientes antes do teste
        cy.deleteAllPatients();

        // Faz login
        cy.login(testUsername, 'password123');

        // Acessa o formulário de cadastro de pacientes
        cy.accessForm();

        // Cadastra um novo paciente
        cy.createPatient(nome, idade, cpf, numero_celular, numero_prontuario, sexo, status);

        // Verifica se o redirecionamento ocorreu para a home após o cadastro
        cy.url({ timeout: 10000 }).should('include', '/home');

        // Acessa a lista de pacientes
        cy.get('[href="/pacientes/"] > .homebutton').click();

        // Verifica se o paciente foi criado com sucesso na interface
        cy.contains(nome).should('exist');
    });
});
