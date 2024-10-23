Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('deleteAllAppointments', () => {
    cy.exec('python delete_consultas.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('deleteAllSpecialties', () => {
    cy.exec('python delete_especialidades.py', { failOnNonZeroExit: false });
});

Cypress.Commands.add('deleteAllDoctors', () => {
    cy.exec('python delete_medicos.py', { failOnNonZeroExit: false });
});

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
    cy.get('#register').click();
    cy.get('.sign_up form').within(() => {
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="senha"]').type(password);
        cy.get('input[type="submit"]').click();
    });
});

Cypress.Commands.add('createSpecialty', (specialty) => {
    cy.visit('/cadastrar_especialidade/');
    cy.get('#nome').type(specialty);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('createDoctor', (nome, especialidade, crm, numero_celular) => {
    cy.visit('/cadastrar_medico/');
    cy.get('#nome').type(nome);
    cy.get('#especialidade').select(especialidade);
    cy.get('#crm').type(crm);
    cy.get('#numero_celular').type(numero_celular);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('createPatient', (nome, idade, cpf, numero_celular, numero_prontuario, sexo, status) => {
    cy.visit('/form/');
    cy.get('#nome').type(nome);
    cy.get('#idade').type(idade);
    cy.get('#cpf').type(cpf);
    cy.get('#numero_celular').type(numero_celular);
    cy.get('#numero_prontuario').type(numero_prontuario);
    cy.get('#sexo').select(sexo);
    cy.get('#status').select(status);
    cy.get('.btn').click();
});

Cypress.Commands.add('createAppointment', (data, horario, medico, paciente) => {
    cy.visit('/cadastrar_consulta/');
    cy.get('#paciente').select(paciente);
    cy.get('#medico').select(medico);
    cy.get('#data_consulta').type(data);
    cy.get('#horario').select(horario);
    cy.get('button[type="submit"]').click();
});

describe('Cadastro de Consultas', () => {
    const especialidade = 'Cardiologia';
    const nomeMedico = 'Dr. João Silva';
    const crm = '123456';
    const celularMedico = '9876543210';
    const nomePaciente = 'Maria Souza';
    const idadePaciente = '30';
    const cpfPaciente = '12345678909';
    const celularPaciente = '81989468836';
    const prontuarioPaciente = '20230004';
    const sexoPaciente = 'F';
    const statusPaciente = 'NÃO ATENDIDO';
    const dataConsulta = '2024-10-24';
    const horarioConsulta = '10:00';
    
    const nomeMedico2 = 'Dr. Paulo';
    const dataConsulta2 = '2024-10-25';
    const horarioConsulta2 = '14:00';
    const cpfPaciente2 = '98765432100';
    const nomePaciente2 = 'João';
    const prontuarioPaciente2 = '20240001';

    beforeEach(() => {
        cy.deleteAllUsers();
        cy.deleteAllAppointments();
        cy.deleteAllSpecialties();
        cy.deleteAllDoctors();
        cy.deletePatient(cpfPaciente);

        cy.visit('/');
        cy.get('#register').click();
        cy.createUser('testuser', 'testuser@example.com', 'password123');
        cy.login('testuser', 'password123');

        cy.createSpecialty(especialidade);
        cy.createDoctor(nomeMedico, especialidade, crm, celularMedico);
        cy.createDoctor(nomeMedico2, especialidade, '654321', '9876543211');
        cy.createPatient(nomePaciente, idadePaciente, cpfPaciente, celularPaciente, prontuarioPaciente, sexoPaciente, statusPaciente);
        cy.createPatient(nomePaciente2, idadePaciente, cpfPaciente2, celularPaciente, prontuarioPaciente2, sexoPaciente, statusPaciente); // Adicionando o paciente João
    });

    it('Cenário 1: Deve agendar uma consulta com sucesso', () => {
        cy.createAppointment(dataConsulta2, horarioConsulta2, nomeMedico2, nomePaciente2);

        cy.visit('/visualizar_consultas/');
        cy.contains(nomePaciente2).should('exist');
        cy.contains(nomeMedico2).should('exist');
        cy.contains('2 p.m.').should('exist');
        cy.get('tbody > tr:nth-child(1) > td:nth-child(4)').should('contain', 'Oct. 25, 2024');
    });

    it('Cenário 2: Deve validar horário indisponível', () => {
        cy.createAppointment(dataConsulta2, horarioConsulta2, nomeMedico2, nomePaciente2);

        cy.createAppointment(dataConsulta2, horarioConsulta2, nomeMedico2, nomePaciente2);

        cy.get('.message').should('contain', 'O médico já está ocupado neste horário.');
    });

    it('Cenário 3: Deve validar campos obrigatórios', () => {
        cy.visit('/cadastrar_consulta/');
        cy.get('button[type="submit"]').click(); 

        cy.get('.message').should('contain', 'Por favor, preencha todos os campos obrigatórios.');
    });

    it('Cenário 4: Deve validar data passada', () => {
        const dataConsultaPassada = '2024-08-15';
        cy.createAppointment(dataConsultaPassada, horarioConsulta, nomeMedico, nomePaciente);

        cy.get('.message').should('contain', 'A data da consulta não pode ser no passado.');
    });

    afterEach(() => {
        cy.deleteAllAppointments();
        cy.deletePatient(cpfPaciente);
        cy.deletePatient(cpfPaciente2); 
    });
});
