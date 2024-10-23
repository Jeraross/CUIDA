Cypress.Commands.add('deletarTodosOsUsuarios', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('deletarPaciente', (cpf) => {
    cy.exec(`python delete_patient.py ${cpf}`, { failOnNonZeroExit: false });
});

Cypress.Commands.add('irParaCadastro', () => {
    cy.get('#register').click();
});

Cypress.Commands.add('fazerLogin', (usuario, senha) => {
    cy.visit('/');
    cy.get('.sign_in form').within(() => {
        cy.get('input[name="username"]').type(usuario);
        cy.get('input[name="senha"]').type(senha);
        cy.get('input[type="submit"]').click();
    });
});

Cypress.Commands.add('criarUsuario', (usuario, email, senha) => {
    cy.visit('/');
    cy.irParaCadastro();
    cy.get('.sign_up form').within(() => {
        cy.get('input[name="username"]').type(usuario);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="senha"]').type(senha);
        cy.get('input[type="submit"]').click();
    });
});

Cypress.Commands.add('acessarFormulario', () => {
    cy.get('[href="/form/"] > .homebutton').click();
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

describe('Fluxo de Usuário: Cadastro de Pacientes', () => {
    const nomeCompleto = 'Guilherme Mourão';
    const idadePaciente = '20';
    const cpfParaDeletar = '12345678909';
    const celularPaciente = '81989468836';
    const prontuarioPaciente = '20230002';
    const sexoPaciente = 'M';
    const statusPaciente = 'NÃO ATENDIDO';

    beforeEach(() => {
        cy.deletarTodosOsUsuarios();
        cy.visit('/');
        cy.irParaCadastro();
        cy.criarUsuario('usuarioTeste', 'usuarioTeste@example.com', 'senha123');
        cy.fazerLogin('usuarioTeste', 'senha123');
        cy.acessarFormulario();
    });

    it('Deve deletar o paciente teste e cadastrar um novo paciente.', () => {
        cy.deletarPaciente(cpfParaDeletar);

        cy.cadastrarPaciente(nomeCompleto, idadePaciente, cpfParaDeletar, celularPaciente, prontuarioPaciente, sexoPaciente, statusPaciente);
        cy.url().should('include', '/home');
        cy.get('[href="/pacientes/"] > .homebutton').click();
        cy.contains(nomeCompleto).should('exist');
    });

    it('Deve exibir uma mensagem de erro ao tentar cadastrar um paciente com o mesmo CPF.', () => {
        cy.cadastrarPaciente(nomeCompleto, idadePaciente, cpfParaDeletar, celularPaciente, '20230003', sexoPaciente, statusPaciente);
        cy.get('.alert').should('exist');
    });

    it('Deve exibir uma mensagem de erro ao tentar cadastrar um paciente com o mesmo número de prontuário.', () => {
        const novoCPF = '98765432100';

        cy.cadastrarPaciente('Jeronimo Rossi', idadePaciente, novoCPF, celularPaciente, prontuarioPaciente, sexoPaciente, statusPaciente);
        cy.get('.alert').should('exist');
    });
});

describe('Validação do Formulário: Cadastro de Pacientes', () => {
    beforeEach(() => {
        cy.deletarTodosOsUsuarios();
        cy.visit('/');
        cy.irParaCadastro();
        cy.criarUsuario('usuarioTeste', 'usuarioTeste@example.com', 'senha123');
        cy.fazerLogin('usuarioTeste', 'senha123');
        cy.acessarFormulario();
    });

    it('Deve impedir o envio do formulário quando um ou mais campos estão vazios.', () => {
        cy.get('#nome').type('Teste Incompleto');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/form'); 

        cy.intercept('POST', '/form', (req) => {
            req.on('response', (res) => {
                expect(res.statusCode).to.eq(400);
            });
        });
    });
});
