![CUIDA banner](https://github.com/user-attachments/assets/6b6bee69-c34e-408c-86ef-3812a4c3b6a9)

## Descrição

CUIDA é um software desenvolvido no framework Django, projetado para otimizar a gestão hospitalar em hospitais públicos, com foco na administração eficiente dos pacientes e na organização dos seus dados. O sistema oferece uma interface intuitiva e de fácil navegação, facilitando o uso por diferentes profissionais de saúde.

Este projeto foi criado como parte da disciplina de Fundamentos de Desenvolvimento de Software na CESAR School - turma 2024.2.

## Funcionalidades

- Visualização:
    >Pacientes atendidos / pendentes
    >Histórico de visitas dos pacientes
- Adicionar pacientes na planilha 
- Cadastrar médicos, atendentes e administradores
- Automação:
    >Entrada de dados
    >Verificação de duplicatas pelo número do prontuário
    >Marcação de status
- Gerar relatórios (mensais/ por pedido)
- Backup automático de dados

## Tecnologias

- **Framework de Desenvolvimento**: Django - Framework web em Python para o back-end.
- **Interface**: HTML/CSS/JavaScript - Para a interface do usuário.
- **Banco de dados**: Sqlite/PostgreSQL - Para armazenar informações.
- **Hospedagem**: Azure - O produto final será hospedado na plataforma Azure.

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

## Jira Backlog

![backlog1](https://github.com/user-attachments/assets/d9c650d1-76a2-4ef4-a9d2-4c6dc0bb75ba)
![backlog2](https://github.com/user-attachments/assets/f12892e9-dc8e-42c0-9077-40b8af543f0f)
![sprint](https://github.com/user-attachments/assets/ff3a1603-29c0-4087-b6b9-a16b690d86af)

O objetivo deste sprint é estabelecer a base operacional do sistema, focando em funcionalidades críticas para o gerenciamento de usuários e a integridade dos dados. Isso inclui o desenvolvimento das seguintes funcionalidades:

Cadastro de Usuários: Implementar a funcionalidade para que administradores possam cadastrar médicos, atendentes e outros administradores, garantindo que as permissões de acesso ao sistema sejam devidamente gerenciadas.

Visualização de Pacientes Atendidos/Pendentes: Criar uma interface que permita aos administradores acompanhar o status dos pacientes, visualizando facilmente quais foram atendidos e quais estão pendentes, para melhorar a gestão e priorização dos atendimentos.

Verificação de Duplicatas pelo Número do Prontuário: Desenvolver um mecanismo de verificação automática para identificar e evitar a criação de registros duplicados no sistema, garantindo a precisão e a integridade dos dados dos pacientes.

Resultado Esperado: Ao final deste sprint, o sistema deve ser capaz de gerenciar diferentes tipos de usuários com permissões adequadas, permitir o acompanhamento eficaz dos atendimentos, e assegurar que os dados dos pacientes sejam únicos e precisos.

