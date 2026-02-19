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

# 🐳 Rodando o Projeto

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

# 🗄️ Banco de Dados

O banco roda via Docker e expõe a porta padrão:

```
5432
```

As configurações ficam no `docker-compose.yml`.

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

---

# 📈 Possíveis Melhorias Futuras

- Paginação
- Autenticação JWT
- Controle de usuários
- Logs estruturados
- Testes E2E
- Swagger Documentation

---

# 👨‍💻 Autor

Desenvolvido por Nielson Vágno.

---
