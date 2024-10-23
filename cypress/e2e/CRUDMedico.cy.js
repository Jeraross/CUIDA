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

describe('Gestão de Médicos', () => {
    const especialidade = 'Cardiologia'; 
    const crm = '123456';
    const nome = 'Dr. João Silva';
    const numero_celular = '9876543210';

    before(() => {
        cy.deleteAllUsers();
        cy.visit('/');
        cy.switchToRegister();
        cy.createUser('testuser', 'testuser@example.com', 'password123');
        cy.login('testuser', 'password123');
    });

    it('Cenário 1: Cadastro de um novo médico com sucesso', () => {
        cy.get('[href="/cadastrar_medico/"]').click();
        cy.get('#nome').type(nome);
        cy.get('#especialidade').select(especialidade);
        cy.get('#crm').type(crm);
        cy.get('#numero_celular').type(numero_celular);
        cy.get('button[type="submit"]').click();

        cy.contains(nome).should('exist');
        cy.contains(crm).should('exist');
        cy.contains(numero_celular).should('exist');
    });

    it('Cenário 2: Impedir cadastro com CRM duplicado', () => {
        cy.visit('/cadastrar_medico/');
        cy.get('#nome').type('Dr. Maria Oliveira');
        cy.get('#especialidade').select(especialidade);
        cy.get('#crm').type(crm);
        cy.get('#numero_celular').type('9123456789');
        cy.get('button[type="submit"]').click();

        cy.contains("Um médico com esse CRM já está cadastrado.").should('exist');
    });

    it('Cenário 3: Excluir um médico cadastrado', () => {
        cy.visit('/visualizar_medicos/');
        cy.contains(nome).parents('tr').find('.btn-excluir').click();
        cy.contains(crm).should('not.exist');
    });
});
