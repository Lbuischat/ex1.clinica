# Clínica API

API REST para gerenciamento de uma clínica médica, desenvolvida com **NestJS, TypeScript, MongoDB e Mongoose**.

O projeto permite cadastrar e consultar pacientes, médicos e consultas, com suporte a filtros, ordenação e paginação.

## Requisitos

- Node.js
- npm
- MongoDB (local ou Atlas)

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=sua_string_de_conexao_mongodb
```

Substitua o valor pela sua string de conexão do MongoDB.

## Executando o projeto

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## Estrutura

O projeto é dividido em três módulos principais:

- **Pacientes:** cadastro e consulta de pacientes.
- **Médicos:** cadastro e consulta de médicos.
- **Consultas:** registro e consulta de atendimentos.

Cada módulo possui seus próprios schemas, DTOs, controllers e services.

## Rotas disponíveis

| Método | Rota | Descrição |
|---|---|---|
| POST | `/pacientes` | Cadastrar paciente |
| GET | `/pacientes` | Listar pacientes |
| GET | `/pacientes/:id` | Buscar paciente por ID |
| POST | `/medicos` | Cadastrar médico |
| GET | `/medicos` | Listar médicos |
| GET | `/medicos/:id` | Buscar médico por ID |
| POST | `/consultas` | Cadastrar consulta |
| GET | `/consultas` | Listar consultas |
| GET | `/consultas/:id` | Buscar consulta por ID |

## Filtros e paginação

As rotas GET de listagem permitem filtrar e organizar os resultados.

- **Pacientes:** `convenio`, `nome`.
- **Médicos:** `especialidade`, `minValor`, `maxValor`.
- **Consultas:** `status`, `minValor`, `maxValor`.

Também são aceitos parâmetros de paginação e ordenação, como `page`, `limit` e `sort`.

Exemplo:

```http
GET /pacientes?nome=Maria&convenio=Unimed&page=1&limit=10
```

## Tratamento de erros

A API utiliza respostas HTTP adequadas para diferentes situações:

- `400 Bad Request`: dados inválidos.
- `404 Not Found`: registro não encontrado.
- `409 Conflict`: CPF, CRM ou código de atendimento duplicado.

