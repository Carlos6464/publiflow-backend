# PubliFlow - Projeto do Grupo 2

## Sumário

1. [Integrantes do Grupo]
2. [Definição do Projeto]
3. [Requisitos Funcionais]
4. [Fluxograma]
5. [Requisitos Técnicos]
6. [Processo de Desenvolvimento]
7. [Relatos dos Desafios Superados]
8. [Entregas]

---

## Integrantes do Grupo 2 - PubliFlow

- [Adriano Sodré - RM366258]
- [Cristhian Mendes - RM365590]
- [Gisele Cidral - RM366463]
- [Gustavo Rocha - RM365401]
- [Lucas Schwittay - RM365656]

---

## Definição do Projeto

O projeto **PubliFlow** consiste em uma plataforma de postagem de conteúdo voltada para docentes e alunos, permitindo centralizar informações acadêmicas através possibilitando criar, editar, visualizar e buscar postagens.

---

## Executando com Docker

Para executar este projeto, é necessário ter o Docker e o Docker Compose instalados.

### 1. Preparação do Ambiente

Antes de iniciar os contêineres, é preciso criar um arquivo de variáveis de ambiente.

- Renomeie o arquivo `.env.exemplo` para `.env`.
- Preencha as variáveis de ambiente necessárias no arquivo `.env` com suas credenciais do PostgreSQL e outras configurações.

### 2. Subir o Ambiente de Desenvolvimento

Para iniciar a API, o banco de dados e o PgAdmin, execute o seguinte comando na raiz do projeto:

```bash
docker compose up --build
```

Para realizar os testes em um ambiente isolado

```bash
docker compose --env-file .env.test -f docker-compose.test.yaml up --build --abort-on-container-exit
```

## Requisitos Funcionais

### Endpoints da API

### Endpoints de alunos:

- **GET /posts** - Lista de Posts  
  Permite aos alunos visualizarem todos os posts disponíveis na página principal.

- **GET /posts/:id** - Leitura de Postagens  
  Permite acessar o conteúdo completo de um post específico pelo ID.

### Endpoints de professores:

- **POST /posts** - Criação de Postagens  
  Permite que docentes criem novas postagens. Aceita dados como título, conteúdo e autor no corpo da requisição.

- **PUT /posts/:id** - Edição de Postagens  
  Permite editar uma postagem existente. É necessário fornecer o ID do post e os novos dados no corpo da requisição.

- **GET /posts** - Listagem de Todas as Postagens  
  Permite que professores vejam todas as postagens criadas, facilitando a gestão do conteúdo.

- **DELETE /posts/:id** - Exclusão de Postagens  
  Permite que docentes excluam uma postagem específica usando o ID do post como parâmetro.

- **GET /posts/search** - Busca de Postagens  
  Permite buscar posts por palavras-chave, retornando posts que contenham o termo no título ou conteúdo.

---

## Fluxograma PubliFlow

_(Inserir imagem ou link do fluxograma do sistema aqui)_

---

## Requisitos Técnicos

- **Back-end em Node.js**

  - Implementação do servidor utilizando Node.js
  - Uso do framework Express para roteamento e middleware

- **Persistência de Dados**

  - Utilização de banco de dados (MongoDB ou PostgreSQL)
  - Implementação de modelos de dados adequados para postagens

- **Containerização com Docker**

  - Desenvolvimento e deploy com contêineres Docker para consistência de ambiente

- **Automação com GitHub Actions**

  - Workflows de CI/CD para testes automáticos e deploy

- **Documentação**

  - Guia de setup inicial, arquitetura da aplicação e uso das APIs

- **Cobertura de Testes**
  - Garantir pelo menos 20% do código coberto por testes unitários, especialmente em funções críticas como criação, edição e exclusão de postagens

---

## Processo de Desenvolvimento

- Planejamento das funcionalidades
- Definição das tecnologias e arquitetura
- Implementação incremental das APIs e banco de dados
- Testes unitários e integração contínua

---

## Relatos dos Desafios Superados

- Adriano Sodré - RM366258:
- Cristhian Mendes - RM365590:
- Gisele Cidral - RM366463:
- Gustavo Rocha - RM365401:
- Lucas Schwittay - RM365656:

---

## Entregas

- **Apresentação em vídeo gravado**
- **Código-fonte do projeto**
- **Arquivos utilizados na apresentação**