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

import ExcelJS from 'exceljs';

Cypress.Commands.add('verificarExcel', (filePath) => {
    cy.wait(5000); // Aguarda o arquivo ser gerado e salvo
  
    // Verifica se o arquivo existe
    cy.readFile(filePath, 'utf8').should('exist').then(() => {
      // Se o arquivo existir, prosseguir com a verificação do conteúdo do Excel
      cy.readFile(filePath, 'base64').then((fileContent) => {
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.load(Buffer.from(fileContent, 'base64')).then(() => {
          const detalhesSheet = workbook.getWorksheet('Detalhes do Paciente');
          expect(detalhesSheet).to.not.be.undefined;
  
          const nomePacienteCell = detalhesSheet.getCell('B1');
          expect(nomePacienteCell.value).to.equal('Guilherme Mourão');
        });
      });
    });
  });
  


describe('Fluxo Completo de Paciente: Registro e Exportação de Dados', () => {
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

    let pacienteId;

    beforeEach(() => {
        // Limpeza e configuração inicial
        cy.deletarTodosOsUsuarios();
        cy.deletarPaciente('12345678909');
        cy.visit('/');
        cy.irParaCadastro();
        cy.criarUsuario('usuarioTeste', 'usuarioTeste@example.com', 'senha123');
        cy.fazerLogin('usuarioTeste', 'senha123');
        cy.acessarFormulario();
        cy.cadastrarPaciente(nomePaciente, '20', '12345678909', '81989468836', '20230002', 'M', 'NÃO ATENDIDO');
        
        cy.acessarDetalhesPaciente(nomePaciente);

        // Extrai o ID do paciente da URL
        cy.location('href').then((url) => {
            const partesUrl = url.split('/');
            pacienteId = partesUrl[partesUrl.length - 2];
        });
    });

    it('Cenário Completo: Adicionar Dados e Exportar para Excel', () => {
        cy.get(`[action="/paciente/${pacienteId}/adicionar_alergia/"] > .form-group > input`).type(alergiaInicial);
        cy.get(`[action="/paciente/${pacienteId}/adicionar_alergia/"] > button`).click();
        cy.contains(alergiaInicial).should('exist');
        
        cy.get(`[action="/paciente/${pacienteId}/adicionar_condicao_especial/"] > .form-group > input`).type(condicaoEspecialInicial);
        cy.get(`[action="/paciente/${pacienteId}/adicionar_condicao_especial/"] > button`).click();
        cy.contains(condicaoEspecialInicial).should('exist');

        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > :nth-child(3) > input`).type(biometriaDataInicial);
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > :nth-child(4) > input`).type(pesoInicial);
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > :nth-child(5) > input`).type(alturaInicial);
        cy.get(`[action="/paciente/${pacienteId}/adicionar_biometria/"] > button`).click();
        cy.contains('Oct. 25, 2024').should('exist');

        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > :nth-child(3) > input`).type(sinaisVitaisDataInicial);
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > :nth-child(4) > input`).type(temperaturaInicial);
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > :nth-child(5) > input`).type(pulsoInicial);
        cy.get(':nth-child(6) > input').type(pressaoInicial);
        cy.get(`[action="/paciente/${pacienteId}/adicionar_sinais_vitais/"] > button`).click();
        cy.contains('Oct. 25, 2024').should('exist');

        cy.get(`[action="/paciente/${pacienteId}/adicionar_medicamento_ativo/"] > .form-group > input`).type(medicamentoAtivoInicial);
        cy.get(`[action="/paciente/${pacienteId}/adicionar_medicamento_ativo/"] > button`).click();
        cy.contains(medicamentoAtivoInicial).should('exist');

        // Baixar o Excel
        cy.get('a > button').click();
        
        cy.wait(2000); // Aguarda o download
        
        // Use o comando personalizado para verificar o Excel
        const filePath = 'cypress/downloads/Guilherme Mourão_detalhes.xlsx'; 
        cy.verificarExcel(filePath);
    });
});