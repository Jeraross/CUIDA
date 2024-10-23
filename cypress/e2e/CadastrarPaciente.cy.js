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

describe('User flow: Patient Registration', () => {
    const nome = 'Guilherme Mourão';
    const idade = '20';
    const cpfToDelete = '12345678909';
    const numero_celular = '81989468836';
    const numero_prontuario = '20230002';
    const sexo = 'M';
    const status = 'NÃO ATENDIDO';

    it('Deve excluir todos os usuários, criar um novo, fazer login, deletar o paciente específico, e cadastrar um novo paciente.', () => {
        cy.deletePatient(cpfToDelete);
        cy.deleteAllUsers();

        cy.visit('/');
        cy.switchToRegister();
        cy.createUser('testuser', 'testuser@example.com', 'password123');
        cy.login('testuser', 'password123');
        cy.accessForm();

        cy.createPatient(nome, idade, cpfToDelete, numero_celular, numero_prontuario, sexo, status);
        cy.url().should('include', '/home');
        cy.get('[href="/pacientes/"] > .homebutton').click();
        cy.contains(nome).should('exist');
    });

    it('Deve exibir uma mensagem de erro ao tentar cadastrar um paciente com o mesmo CPF.', () => {
        cy.deleteAllUsers();

        cy.visit('/');
        cy.switchToRegister();
        cy.createUser('testuser', 'testuser@example.com', 'password123');
        cy.login('testuser', 'password123');
        cy.accessForm();

        cy.createPatient(nome, idade, cpfToDelete, numero_celular, '20230003', sexo, status);
        cy.get('.alert').should('exist'); // Verifica a existência da mensagem de erro
    });

    it('Deve exibir uma mensagem de erro ao tentar cadastrar um paciente com o mesmo número de prontuário.', () => {
        const novoCPF = '98765432100';
        
        cy.deleteAllUsers();

        cy.visit('/');
        cy.switchToRegister();
        cy.createUser('testuser', 'testuser@example.com', 'password123');
        cy.login('testuser', 'password123');
        cy.accessForm();

        cy.createPatient('Jeronimo Rossi', idade, novoCPF, numero_celular, numero_prontuario, sexo, status);
        cy.get('.alert').should('exist'); // Verifica a existência da mensagem de erro
    });
});

describe('Form validation: Patient Registration', () => {
    it('Deve impedir o envio do formulário quando um ou mais campos estão vazios.', () => {
        cy.deleteAllUsers();

        cy.visit('/');
        cy.switchToRegister();
        cy.createUser('testuser', 'testuser@example.com', 'password123');
        cy.login('testuser', 'password123');
        cy.accessForm();

        cy.get('#nome').type('Teste Incompleto');
        cy.get('button[type="submit"]').click();

        // Verifica se a página ainda está no formulário (significa que a submissão falhou)
        cy.url().should('include', '/form'); 

        // Verifica o status da resposta HTTP (opcional)
        cy.intercept('POST', '/form', (req) => {
            req.on('response', (res) => {
                expect(res.statusCode).to.eq(400); // Verifica se o status HTTP é 400 Bad Request
            });
        });

    });
});

