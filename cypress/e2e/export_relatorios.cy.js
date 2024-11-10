Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('deletarPacientes', () => {
    cy.exec('python delete_all_patients.py', { failOnNonZeroExit: false });
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

Cypress.Commands.add('acessarFormulario', () => {
    cy.visit('/form');
});

Cypress.Commands.add('cadastrarPaciente', (nomeCompleto, idadePaciente, cpfPaciente, celularPaciente, prontuarioPaciente, sexoPaciente, statusPaciente) => {
    cy.get('#nome').type(nomeCompleto);
    cy.get('#idade').type(idadePaciente);
    cy.get('#cpf').type(cpfPaciente);
    cy.get('#numero_celular').type(celularPaciente);
    cy.get('#numero_prontuario').type(prontuarioPaciente);
    cy.get('#sexo').select(sexoPaciente);
    cy.get('#status').select(statusPaciente);
    cy.get('.btn').click();
});

const nomeCompleto = 'Guilherme Mourão';
const idadePaciente = '20';
const cpfParaDeletar = '12345678909';
const celularPaciente = '81989468836';
const prontuarioPaciente = '20230002';
const sexoPaciente = 'M';
const statusPaciente = 'NÃO ATENDIDO';

beforeEach(() => {
    cy.deleteAllUsers();

    cy.visit('/');
    cy.get('#register').click();
    cy.createUser('testuser', 'testuser@example.com', 'password123');
    cy.login('testuser', 'password123');
});


describe('Geração de Relatórios', () => {
    it('Cenário 1:Deve gerar um relatório de pacientes com sucesso', () => {

        cy.acessarFormulario();
        cy.cadastrarPaciente(nomeCompleto, idadePaciente, cpfParaDeletar, celularPaciente, prontuarioPaciente, sexoPaciente, statusPaciente);
        cy.visit('/home');
        cy.get('.btn.btn-primary .homebutton').click();

        cy.readFile('cypress/downloads/relatorio_pacientes.xlsx').should('exist');

        cy.task('readExcel', 'cypress/downloads/relatorio_pacientes.xlsx').then((rows) => {
            expect(rows.length).to.be.greaterThan(0); // Verifica que o relatório não está vazio
            expect(rows[0]).to.include.members(['id_paciente', 'nome', 'idade', 'cpf', 'numero_celular', 'numero_prontuario', 'sexo', 'status']);
        });
    });

    it('Cenário 2:Deve gerar um relatório de pacientes sem pacientes cadastrados', () => {

        cy.deletarPacientes();
        cy.visit('/home');
        cy.get('.btn.btn-primary .homebutton').click();

        cy.readFile('cypress/downloads/relatorio_pacientes.xlsx').should('exist');
        
        cy.task('readExcel', 'cypress/downloads/relatorio_pacientes.xlsx').then((rows) => {
            expect(rows.length).to.equal(0); // Relatório está vazio
        });
    })
});
