![CUIDA banner](https://github.com/user-attachments/assets/6b6bee69-c34e-408c-86ef-3812a4c3b6a9)

## Descrição

CUIDA é um software desenvolvido no framework Django, projetado para otimizar a gestão hospitalar em hospitais públicos, com foco na administração eficiente dos pacientes e na organização dos seus dados. O sistema oferece uma interface intuitiva e de fácil navegação, facilitando o uso por diferentes profissionais de saúde.

Este projeto foi criado como parte da disciplina de Fundamentos de Desenvolvimento de Software na CESAR School - turma 2024.2.

## Funcionalidades

- Visualização:
    >Pacientes atendidos / pendentes
    >Histórico de visitas dos pacientes
- Cadastrar atendentes (usuários), pacientes, especialidades médicas, médicos
- Automação:
    >Entrada de dados
    >Verificação de duplicatas pelo número do prontuário
    >Marcação de status
- Agendar Consultas
- Gerar relatórios (mensais/ por pedido)
- Backup automático de dados

## Tecnologias

- **Framework de Desenvolvimento**: Django - Framework web em Python para o back-end.
- **Interface**: HTML/CSS/JavaScript - Para a interface do usuário.
- **Banco de dados**: Sqlite/PostgreSQL - Para armazenar informações.
- **Hospedagem**: Azure - O produto final será hospedado na plataforma Azure.
- **Framework de Testes**: Cypress . Os testes automatizados estão sendo feitos com auxílio do Cypress.

## Ferramentas

- **Prototipação**: Figma - Utilizado para criar e validar protótipos de design da interface do usuário.
- **Gestão de Projetos**: Jira - Ferramenta para o planejamento e acompanhamento das tarefas do projeto.
- **Comunicação e Reuniões**: Discord/WhatsApp - Plataformas utilizadas para reuniões e comunicação da equipe.

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

## Equipe

- [Guilherme Mourão](https://github.com/guilhermemouraovc) - gmvc@cesar.school
- [Henrique Figueiredo](https://github.com/fthenri) - hft@cesar.school
- [Henrique Gueiros](https://github.com/henrique-gueiros) - hwg@cesar.school
- [Jeronimo Rossi](https://github.com/Jeraross) - jbr2@cesar.school
- [João Pedro Aguiar](https://github.com/Jp-moraiss) - jpam@cesar.school
- [Maria Julia Dantas](https://github.com/mariajuliadantas) - mjdma@cesar.school

<details>
<summary><h2>Links</h2></summary>

<div align="center">
    <a href="https://cuida.azurewebsites.net/">
        <img src="https://img.shields.io/badge/Site%20Azure-0078D4?style=for-the-badge&logo=Microsoft-Azure&logoColor=white" alt="Site Azure">
    </a>
    <a href="https://projetofds-2.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog">
        <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" alt="Jira">
    </a>
    <a href="https://www.figma.com/design/CndQKFYTloNvwzZdAP9MBW/CUIDA?node-id=0-1&t=9B6yPwZDwriNW5Py-1">
        <img src="https://img.shields.io/badge/Figma%20do%20Projeto-0AC97F?style=for-the-badge&logo=Figma&logoColor=white" alt="Figma">
    </a>
</div>

---

</details>


<details>
<summary><h2>Primeira entrega</h2></summary>

[Screencast do protótipo](https://youtu.be/rj-HaZjpsRU)

[Link do jira da equipe](https://projetofds-2.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog)

![backlog](https://github.com/user-attachments/assets/19e4291e-e775-4708-9ecc-9d0093c022de)

![Sprint](https://github.com/user-attachments/assets/83452c10-191d-45f9-af89-4f5c09271bb1)


O objetivo deste sprint é estabelecer a base operacional do sistema, focando em funcionalidades críticas para o gerenciamento de usuários e a integridade dos dados. Isso inclui o desenvolvimento das seguintes funcionalidades:

Cadastro de Usuários: Implementar a funcionalidade para que administradores possam cadastrar médicos, atendentes e outros administradores, garantindo que as permissões de acesso ao sistema sejam devidamente gerenciadas.

Visualização de Pacientes Atendidos/Pendentes: Criar uma interface que permita aos administradores acompanhar o status dos pacientes, visualizando facilmente quais foram atendidos e quais estão pendentes, para melhorar a gestão e priorização dos atendimentos.

Verificação de Duplicatas pelo Número do Prontuário: Desenvolver um mecanismo de verificação automática para identificar e evitar a criação de registros duplicados no sistema, garantindo a precisão e a integridade dos dados dos pacientes.

Resultado Esperado: Ao final deste sprint, o sistema deve ser capaz de gerenciar diferentes tipos de usuários com permissões adequadas, permitir o acompanhamento eficaz dos atendimentos, e assegurar que os dados dos pacientes sejam únicos e precisos.
</details>

<details>
<summary><h2>Segunda entrega</h2></summary>

![print jira](https://github.com/user-attachments/assets/9bc67e63-33ab-4a5b-9a38-0f2d70de8f51)

![print backlog](https://github.com/user-attachments/assets/dbd63170-59f0-4090-9376-496df929f044)

<p align="center">
<a href="https://youtu.be/VcyipfuOsEo" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Screencast-blue?style=for-the-badge" alt="Screencast Azure">
  </a>
</p>

</details>

<details>
<summary><h2>Terceira entrega</h2></summary>

![print_backlog](https://github.com/user-attachments/assets/250a3554-bfe6-41d6-a7ac-29806c74e239)
![print_painel](https://github.com/user-attachments/assets/bd59a012-737b-4716-b970-1682d933725a)

# Screencasts

<p align="center">
  <a href="https://youtu.be/cp6oxWRFipo" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Screencast%20Azure-blue?style=for-the-badge" alt="Screencast Azure">
  </a>
  <a href="https://youtu.be/qOd59qAeruw" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Screencast%20Testes-green?style=for-the-badge" alt="Screencast Testes">
  </a>
  <a href="https://youtu.be/-xv2u3OiRsc" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Screencast%20Figma-orange?style=for-the-badge" alt="Screencast Figma">
  </a>
</p>

</details>

<details>
<summary><h2>Quarta entrega</h2></summary>

![print backlog](https://github.com/user-attachments/assets/f2a0f58b-235b-4529-b5fc-62b4f80c1a67)
![print_painel](https://github.com/user-attachments/assets/d7e439eb-8a57-4df8-be97-5f0409ddce74)

![print issues/bug tracker](https://github.com/user-attachments/assets/27a359fd-9107-4fcc-814f-8fd0189700b4)

# Screencasts

<p align="center">
  <a href="https://youtu.be/dEnAB3lUhdQ" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Screencast%20CI/CD-blue?style=for-the-badge" alt="Screencast CI/CD">
  </a>
  <a href="https://youtu.be/Z-oKF-4Y4UY" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Screencast%20Testes-green?style=for-the-badge" alt="Screencast Testes">
  </a>
  <a href="https://youtu.be/eq4laIb6xls" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Screencast%20Figma-orange?style=for-the-badge" alt="Screencast Figma">
  </a>
  <a href="https://youtu.be/gQD4BDeOzjY" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Screencast%20Azure-purple?style=for-the-badge" alt="Screencast Azure">
  </a>
</p>



</details>




