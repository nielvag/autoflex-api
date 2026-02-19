# 🚀 Autoflex API

API REST para gerenciamento de:

- 📦 Produtos
- 🧱 Matérias-primas
- 🔗 Associação Produto x Matéria-prima
- 📊 Geração de Plano de Produção

---

## 🏗️ Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Docker**
- **Decimal.js** (para cálculos monetários e de estoque com precisão)
- **Class-validator**

---

# 📦 Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- Node.js (v18+ recomendado)
- Docker
- Docker Compose

---

# 🐳 Rodando o Projeto (Ambiente de Desenvolvimento)

## 1️⃣ Subir o banco de dados (PostgreSQL)

Primeira vez:

```bash
docker compose up -d --build
```

Demais vezes:

```bash
docker compose up -d
```

Isso irá subir o container do PostgreSQL.

---

## 2️⃣ Instalar dependências

```bash
npm install
```

---

## 3️⃣ Rodar a aplicação

Modo normal:

```bash
npm run start
```

Modo desenvolvimento (watch):

```bash
npm run start:dev
```

Modo debug:

```bash
npm run start:debug
```

---

# 🧪 Ambiente de Testes (E2E / Cypress)

O sistema possui um **ambiente exclusivo para testes**, com banco de dados separado do ambiente de desenvolvimento.

## 📌 Características do ambiente de teste

- Utiliza banco **PostgreSQL próprio**
- Roda em porta diferente da base de desenvolvimento
- Sempre inicia com o banco **zerado**
- Possui endpoint específico para reset do banco
- Totalmente isolado do ambiente principal

---

## 🐳 1️⃣ Subir o banco de dados de teste

```bash
docker compose -f docker-compose.test.yml up -d
```

Esse comando sobe o PostgreSQL exclusivo para testes.

---

## 🚀 2️⃣ Rodar a API em modo de teste

```bash
npm run start:test
```

Esse comando:

- Define `NODE_ENV=test`
- Conecta no banco de teste
- Recria o schema automaticamente
- Garante que o banco inicie completamente limpo

Sempre que a API é iniciada nesse modo, o banco começa zerado.

---

## 🔄 Reset manual do banco de testes

Existe um endpoint exclusivo para ambiente de teste:

```
POST /test-utils/reset
```

Esse endpoint:

- Remove todas as tabelas
- Recria o schema
- Deixa o banco completamente limpo

⚠️ Esse endpoint só existe quando a aplicação roda com `NODE_ENV=test`.

Exemplo de uso (Cypress):

```js
cy.request('POST', 'http://localhost:3000/test-utils/reset');
```

Recomendado executar antes de cada teste E2E.

---

# 🗄️ Banco de Dados

## 🔹 Desenvolvimento

- Porta: `5432`
- Configuração: `docker-compose.yml`

## 🔹 Teste

- Porta: `5433`
- Configuração: `docker-compose.test.yml`
- Banco isolado e não persistente

---

# 🔄 Migrations

Para gerar migration:

```bash
npm run migration:generate
```

Para rodar migrations:

```bash
npm run migration:run
```

No ambiente de teste as migrations não são executadas automaticamente, pois o schema é recriado via `synchronize`.

---

# 📡 Endpoints Principais

## Produtos

- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PATCH /products/:id`
- `DELETE /products/:id`

---

## Matérias-primas

- `GET /raw-materials`
- `GET /raw-materials/:id`
- `POST /raw-materials`
- `PATCH /raw-materials/:id`
- `DELETE /raw-materials/:id`

---

## Associação Produto x Matéria-prima

- `GET /product-raw-materials/:productId`
- `PUT /product-raw-materials/:productId/:rawMaterialId`
- `DELETE /product-raw-materials/:productId/:rawMaterialId`

---

## 📊 Plano de Produção

- `GET /production-plan`

Gera automaticamente o plano de produção baseado:

- No estoque disponível
- Na quantidade necessária por produto
- Priorizando produtos com maior valor

---

# 💰 Precisão Monetária

Este projeto utiliza `decimal.js` para evitar erros de precisão com `number` do JavaScript.

Exemplo de problema evitado:

```js
0.1 + 0.2 !== 0.3;
```

Por isso valores monetários e de estoque são manipulados com `Decimal`.

---

# 🧠 Regras de Negócio Importantes

- Não é possível excluir uma matéria-prima se ela estiver vinculada a um produto.
- Não é possível duplicar códigos de produto ou matéria-prima.
- O plano de produção falha caso não haja estoque suficiente.

---

# 📌 Observações

- A aplicação roda por padrão na porta:

```
http://localhost:3000
```

- Certifique-se de que essa porta não esteja ocupada.
- Nunca utilize o banco de desenvolvimento para testes E2E.

---

# 📈 Possíveis Melhorias Futuras

- Paginação
- Autenticação JWT
- Controle de usuários
- Logs estruturados
- Testes E2E automatizados via CI
- Swagger Documentation

---

# 👨‍💻 Autor

Desenvolvido por Nielson Vágno.
