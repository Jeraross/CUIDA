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

describe('Cadastro de Médico', () => {
    const especialidade = 'Cardiologia'; 
    const crm = '123456';
    const nome = 'Dr. João Silva';
    const numero_celular = '9876543210';

    before(() => {
        cy.deleteAllUsers(); // Deletar todos os usuários antes do teste
        cy.visit('/');
        cy.switchToRegister();
        cy.createUser('testuser', 'testuser@example.com', 'password123');
        cy.login('testuser', 'password123');
    });

    it('deve cadastrar um novo médico com sucesso', () => {
        cy.get('[href="/cadastrar_medico/"]').click();
        cy.get('#nome').type(nome);
        cy.get('#especialidade').select(especialidade); // Certifique-se de que a especialidade está disponível
        cy.get('#crm').type(crm);
        cy.get('#numero_celular').type(numero_celular);
        cy.get('button[type="submit"]').click();

        // Verifica se o médico foi cadastrado na lista
        cy.contains(nome).should('exist'); 
        cy.contains(crm).should('exist'); 
    });

    it('não deve permitir cadastrar um médico com o mesmo CRM', () => {
        cy.get('.lucide').click();
        cy.get('#nome').type('Dr. Maria Oliveira');
        cy.get('#especialidade').select(especialidade);
        cy.get('#crm').type(crm); // Tentar cadastrar o mesmo CRM
        cy.get('#numero_celular').type('9123456789');
        cy.get('button[type="submit"]').click();

        // Verifica se a mensagem de erro aparece
        cy.contains("Um médico com esse CRM já está cadastrado.").should('exist');
    });
});
