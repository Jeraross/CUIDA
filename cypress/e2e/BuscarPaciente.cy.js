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

Cypress.Commands.add('createPatient', (nome, idade, cpf, numero_celular, numero_prontuario, sexo, status) => {
    cy.visit('/form');
    
    cy.get('#nome').type(nome);
    cy.get('#idade').type(idade);
    cy.get('#cpf').type(cpf);
    cy.get('#numero_celular').type(numero_celular);
    cy.get('#numero_prontuario').type(numero_prontuario);
    cy.get('#sexo').select(sexo);
    cy.get('#status').select(status);
    
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('deletePatient', (cpf) => {
    cy.exec(`python delete_patient.py ${cpf}`, { failOnNonZeroExit: false });
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
    cy.visit('/home');
    cy.get('[href="/pacientes/"] > .homebutton').click();
});

Cypress.Commands.add('search', (name) => {
    cy.get('#searchInput').clear().type(name);
    cy.get('#searchInput').type('{enter}');
});

describe('Funcionalidade de Busca de Pacientes', () => {
    
    beforeEach(() => {
        cy.deleteAllUsers();
        cy.visit('/');
        cy.switchToRegister();
        cy.createUser('testuser', 'testuser@example.com', 'password123');
        cy.login('testuser', 'password123');
        cy.viewPatients();
    });

    afterEach(() => {
        cy.exec('python delete_all_patients.py', { failOnNonZeroExit: false });
    });

    it('Cenário 1: Deve exibir a lista de pacientes cujos nomes contêm "João"', () => {
        const nomePaciente1 = 'João da Silva';
        const nomePaciente2 = 'João Pedro';
        const cpf1 = '12345678909';
        const cpf2 = '98765432100';

        cy.createPatient(nomePaciente1, '30', cpf1, '81912345678', '20230001', 'M', 'NÃO ATENDIDO');
        cy.createPatient(nomePaciente2, '25', cpf2, '81912345679', '20230002', 'M', 'NÃO ATENDIDO');

        cy.viewPatients();
        cy.search('João');

        cy.contains(nomePaciente1).should('exist');
        cy.contains(nomePaciente2).should('exist');
    });

    it('Cenário 2: Deve exibir a lista vazia quando não há resultados (busca por "XYZ")', () => {
        cy.search('XYZ');

        cy.get('#notFoundMessage').should('exist');
    });

    it('Cenário 3: Deve exibir todos os pacientes quando a busca estiver vazia', () => {
        const nomePaciente1 = 'João da Silva';
        const nomePaciente2 = 'João Pedro';
        const cpf1 = '12345678909';
        const cpf2 = '98765432100';

        cy.createPatient(nomePaciente1, '30', cpf1, '81912345678', '20230001', 'M', 'NÃO ATENDIDO');
        cy.createPatient(nomePaciente2, '25', cpf2, '81912345679', '20230002', 'M', 'NÃO ATENDIDO');

        cy.get('[href="/pacientes/"] > .homebutton').click();

        cy.contains(nomePaciente1).should('exist');
        cy.contains(nomePaciente2).should('exist');
    });

    it('Cenário 4: Deve exibir uma mensagem de erro ao procurar um paciente não existente', () => {
        const nomePaciente = 'Paciente';

        cy.search(nomePaciente);

        cy.get('#notFoundMessage').should('exist');
    });

    it('Cenário 5: Deve exibir resultados case-insensitive', () => {
        const nomePaciente = 'Guilherme Mourão';
        const cpf = '95570044019';

        cy.createPatient(nomePaciente, '30', cpf, '81912345677', '20230003', 'M', 'NÃO ATENDIDO');

        cy.get('[href="/pacientes/"] > .homebutton').click();
        cy.search('guilherme');

        cy.contains(nomePaciente).should('exist');
    });
});
