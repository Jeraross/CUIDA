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

// Comando para acessar a página de detalhes do paciente
Cypress.Commands.add('acessarDetalhesPaciente', (nomePaciente) => {
    cy.get('[href="/pacientes/"] > .homebutton').click();
    cy.contains(nomePaciente).click();
});

// Comando para adicionar uma observação
Cypress.Commands.add('adicionarObservacao', (observacao) => {
    cy.get('#adicionar-observacao').click(); // botão para abrir formulário de observação
    cy.get('textarea[name="observacao"]').type(observacao);
    cy.get('button[type="submit"]').click();
});

// Comando para editar uma observação
Cypress.Commands.add('editarObservacao', (novaObservacao) => {
    cy.get('.editar-observacao').first().click(); // botão para editar a primeira observação
    cy.get('textarea[name="observacao"]').clear().type(novaObservacao);
    cy.get('button[type="submit"]').click();
});

// Comando para excluir uma observação
Cypress.Commands.add('excluirObservacao', () => {
    cy.get('.excluir-observacao').first().click();
    cy.get('.confirmar-exclusao').click(); // confirmar exclusão
});

describe('Fluxo de Usuário: Registro e Manipulação de Observações', () => {
    const nomePaciente = 'Guilherme Mourão';
    const alergiaInicial = 'Alergia a penicilina';
    const condicaoEspecialInicial = 'Hipertensão';
    const biometriaDataInicial = '2024-10-25';
    const pesoInicial = '78';
    const alturaInicial = '178';
    const sinaisVitaisDataInicial = '2024-10-25';
    const temperaturaInicial = '37.5';
    const pulsoInicial = '80';
    const pressaoInicial = '120/80';
    const medicamentoAtivoInicial = 'Losartana';

    let pacienteId; // Variável para armazenar o ID do paciente

    beforeEach(() => {
        // Cadastra um paciente para os testes
        cy.deletarTodosOsUsuarios();
        cy.deletarPaciente('12345678909');
        cy.visit('/');
        cy.irParaCadastro();
        cy.criarUsuario('usuarioTeste', 'usuarioTeste@example.com', 'senha123');
        cy.fazerLogin('usuarioTeste', 'senha123');
        cy.acessarFormulario();
        cy.cadastrarPaciente(nomePaciente, '20', '12345678909', '81989468836', '20230002', 'M', 'NÃO ATENDIDO');
        
        // Após cadastrar o paciente, acessa a página de detalhes do paciente
        cy.acessarDetalhesPaciente(nomePaciente);

        // A partir da URL da página de detalhes, extrai o ID do paciente
        cy.location('href').then((url) => {
            // Extrai o ID da URL
            const partesUrl = url.split('/');
            pacienteId = partesUrl[partesUrl.length - 2]; // O ID do paciente é a penúltima parte da URL
        });
    });

    it('Cenário 1: Adicionar e Visualizar Alergia', () => {
        cy.get(`[action="/paciente/${pacienteId}/adicionar_alergia/"] > .form-group > input`).type(alergiaInicial); // Digita a descrição da alergia
        cy.get(`[action="/paciente/${pacienteId}/adicionar_alergia/"] > button`).click(); // Clica no botão de salvar
        cy.contains(alergiaInicial).should('exist'); // Verifica se a alergia foi adicionada corretamente
    });

    it('Cenário 2: Exclusão de Alergia', () => {
        cy.get(`[action="/paciente/${pacienteId}/adicionar_alergia/"] > .form-group > input`).type(alergiaInicial); // Digita a descrição da alergia
        cy.get(`[action="/paciente/${pacienteId}/adicionar_alergia/"] > button`).click(); // Clica no botão de salvar
        cy.get(':nth-child(2) > form > button').click(); // Exclui a alergia
        cy.contains(alergiaInicial).should('not.exist'); // Verifica se a alergia foi excluída
    });


    it('Cenário 3: Adicionar e Visualizar Condição Especial', () => {
        cy.get(`[action="/paciente/${pacienteId}/adicionar_condicao_especial/"] > .form-group > input`).type(condicaoEspecialInicial); // Digita a descrição da condição especial
        cy.get(`[action="/paciente/${pacienteId}/adicionar_condicao_especial/"] > button`).click(); // Clica no botão de salvar
        cy.contains(condicaoEspecialInicial).should('exist'); // Verifica se a condição especial foi adicionada corretamente
    });

    it('Cenário 4: Exclusão de Condição Especial', () => {
        cy.get(`[action="/paciente/${pacienteId}/adicionar_condicao_especial/"] > .form-group > input`).type(condicaoEspecialInicial); // Digita a descrição da condição especial
        cy.get(`[action="/paciente/${pacienteId}/adicionar_condicao_especial/"] > button`).click(); // Clica no botão de salvar
        cy.get(':nth-child(2) > form > button').click()
        cy.contains(condicaoEspecialInicial).should('not.exist'); // Verifica se a condição especial foi excluída
    });

    it('Cenário 5: Adicionar e Visualizar Biometria', () => {
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > :nth-child(3) > input`).type(biometriaDataInicial); // Digita a data da biometria
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > :nth-child(4) > input`).type(pesoInicial); // Digita o peso
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > :nth-child(5) > input`).type(alturaInicial); // Digita a altura
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > button`).click(); 
        cy.contains('Oct. 25, 2024').should('exist'); // Verifica se a biometria foi adicionada corretamente
    });

    it('Cenário 6: Exclusão de Biometria', () => {
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > :nth-child(3) > input`).type(biometriaDataInicial); // Digita a data da biometria
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > :nth-child(4) > input`).type(pesoInicial); // Digita o peso
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > :nth-child(5) > input`).type(alturaInicial); // Digita a altura
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > button`).click(); 
        cy.get(':nth-child(5) > form > button').click();
        cy.contains('Oct. 25, 2024').should('not.exist'); // Verifica se a biometria foi excluída
    });

    it('Cenário 7: Adicionar e Visualizar Sinais Vitais', () => {
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > :nth-child(3) > input`).type(sinaisVitaisDataInicial); // Digita a data dos sinais vitais
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > :nth-child(4) > input`).type(temperaturaInicial); // Digita a temperatura
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > :nth-child(5) > input`).type(pulsoInicial); // Digita o pulso
        cy.get(':nth-child(6) > input').type(pressaoInicial); // Digita a pressão
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > button`).click(); // Clica no botão de salvar
        cy.contains('Oct. 25, 2024').should('exist'); // Verifica se os sinais vitais foram adicionados corretamente
    });

    it('Cenário 8: Exclusão de Sinais Vitais', () => {
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > :nth-child(3) > input`).type(sinaisVitaisDataInicial); // Digita a data dos sinais vitais
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > :nth-child(4) > input`).type(temperaturaInicial); // Digita a temperatura
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > :nth-child(5) > input`).type(pulsoInicial); // Digita o pulso
        cy.get(':nth-child(6) > input').type(pressaoInicial); // Digita a pressão
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > button`).click(); // Clica no botão de salvar
        cy.get(':nth-child(5) > form > button').click(); // Exclui os sinais vitais
        cy.contains('Oct. 25, 2024').should('not.exist'); // Verifica se os sinais vitais foram excluídos
    });

    it('Cenário 9: Adicionar e Visualizar Medicamento Ativo', () => {
        // Digita o nome do medicamento ativo
        cy.get(`[action="/paciente/${pacienteId}/adicionar_medicamento_ativo/"] > .form-group > input`).type(medicamentoAtivoInicial); 
        cy.get(`[action="/paciente/${pacienteId}/adicionar_medicamento_ativo/"] > button`).click(); // Clica no botão de salvar
    
        // Verifica se o medicamento ativo foi adicionado corretamente
        cy.contains(medicamentoAtivoInicial).should('exist');
    });
    
    it('Cenário 10: Exclusão de Medicamento Ativo', () => {
        // Adiciona o medicamento ativo primeiro
        cy.get(`[action="/paciente/${pacienteId}/adicionar_medicamento_ativo/"] > .form-group > input`).type(medicamentoAtivoInicial); 
        cy.get(`[action="/paciente/${pacienteId}/adicionar_medicamento_ativo/"] > button`).click(); // Clica no botão de salvar
    
        // Exclui o medicamento ativo
        cy.get(':nth-child(2) > form > button').click(); // Clica no botão de excluir
        cy.contains(medicamentoAtivoInicial).should('not.exist'); // Verifica se o medicamento foi excluído
    });
});
