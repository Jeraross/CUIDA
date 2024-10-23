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

describe('Fluxo de Especialidade', () => {
    const especialidade = 'Cardiologia'; 

    beforeEach(() => {
        cy.deleteAllUsers();
        cy.visit('/');
        cy.switchToRegister();
        cy.createUser('testuser', 'testuser@example.com', 'password123');
        cy.login('testuser', 'password123');
    });

    it('Cenário 1: Cadastrar uma nova especialidade', () => {
        cy.visit('/visualizar_especialidades/');
        cy.contains(especialidade).then(($especialidade) => {
            if ($especialidade.length) {
                cy.contains(especialidade).siblings('form').find('.btn-excluir').click();
                cy.on('window:confirm', () => true);
                cy.contains(especialidade).should('not.exist');
            }
        });

        cy.get('.lucide').click(); 
        cy.get('[href="/cadastrar_especialidade/"] > .homebutton').click();
        cy.get('#nome').type(especialidade);
        cy.get('button[type="submit"]').click();

        cy.contains(especialidade).should('exist');
    });

    it('Cenário 2: Excluir uma especialidade existente', () => {
        cy.get('[href="/cadastrar_especialidade/"] > .homebutton').click();
        cy.get('#nome').type(especialidade);
        cy.get('button[type="submit"]').click();

        cy.visit('/visualizar_especialidades/');
        cy.contains(especialidade).siblings('form').find('.btn-excluir').click();
        cy.on('window:confirm', () => true);
        
        cy.contains(especialidade).should('not.exist');
    });

    it('Cenário 3: Tentar cadastrar uma especialidade já existente', () => {
        cy.get('[href="/cadastrar_especialidade/"] > .homebutton').click();
        cy.get('#nome').type(especialidade);
        cy.get('button[type="submit"]').click();
        cy.contains(especialidade).should('exist');

        cy.get('.lucide').click(); 
        cy.get('[href="/cadastrar_especialidade/"] > .homebutton').click();
        cy.get('#nome').type(especialidade);
        cy.get('button[type="submit"]').click();

        cy.contains("Essa especialidade já está cadastrada.").should('exist');
    });

    it('Cenário 4: Listar especialidades', () => {
        cy.get('[href="/cadastrar_especialidade/"] > .homebutton').click();
        cy.get('#nome').type(especialidade);
        cy.get('button[type="submit"]').click();
        
        cy.visit('/visualizar_especialidades/');
        cy.contains(especialidade).should('exist');
    });
});
