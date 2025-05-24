# API de Sistema de Pedidos

Uma API RESTful para gerenciamento de pedidos com sistema de pontos de fidelidade, construída com Node.js, Express e Sequelize feito para a matéria de desenvolvimento de API na UNEX.

## 📋 Funcionalidades

- **Autenticação e Autorização** com JWT
- **Gestão de Usuários** (clientes e administradores)
- **Catálogo de Produtos** organizados por categorias
- **Sistema de Pedidos** com controle de status
- **Programa de Pontos** de fidelidade
- **Controle de Estoque** automático

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **JWT** - Autenticação via tokens
- **bcrypt** - Criptografia de senhas
- **dotenv** - Variáveis de ambiente
- **CORS** - Controle de acesso

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd nome-do-projeto
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env`:
```env
# Banco de dados
DB_NAME=nome_do_banco
DB_USER=usuario_do_banco
DB_PASSWORD=senha_do_banco
DB_HOST=localhost
DB_DIALECT=mysql

# JWT
JWT_SENHA=sua_chave_secreta_jwt

# Servidor
PORT=3000
NODE_ENV=development
```

4. Execute as migrações do banco de dados:

5. Inicie o servidor:


## 🔗 Endpoints da API

### Autenticação
- `POST /auth/register` - Cadastrar novo usuário
- `POST /auth/login` - Fazer login
- `GET /auth/me` - Obter dados do usuário logado

### Usuários
- `GET /usuarios` - Listar usuários (admin)
- `GET /usuarios/clientes` - Listar apenas clientes (admin)
- `GET /usuarios/:id` - Buscar usuário por ID
- `POST /usuarios` - Criar usuário
- `PUT /usuarios/:id` - Atualizar usuário
- `DELETE /usuarios/:id` - Deletar usuário (admin)

### Produtos
- `GET /produtos` - Listar produtos
- `GET /produtos/:id` - Buscar produto por ID
- `POST /produtos` - Criar produto (admin)
- `PUT /produtos/:id` - Atualizar produto (admin)
- `DELETE /produtos/:id` - Deletar produto (admin)

### Categorias
- `GET /categorias` - Listar categorias
- `GET /categorias/:id` - Buscar categoria por ID
- `POST /categorias` - Criar categoria (admin)
- `PUT /categorias/:id` - Atualizar categoria (admin)
- `DELETE /categorias/:id` - Deletar categoria (admin)

### Pedidos
- `GET /pedidos` - Listar todos os pedidos (admin)
- `GET /pedidos/meus-pedidos` - Listar pedidos do cliente logado
- `GET /pedidos/:id` - Buscar pedido por ID
- `POST /pedidos` - Criar novo pedido
- `PATCH /pedidos/:id/status` - Atualizar status do pedido (admin)
- `DELETE /pedidos/:id` - Deletar pedido (admin)

### Pontos
- `GET /pontos/:cliente_id` - Consultar pontos do cliente
- `POST /pontos/adicionar` - Adicionar pontos (admin)
- `POST /pontos/resgatar` - Resgatar pontos

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Inclua o token no header das requisições:

```
Authorization: Bearer seu_token_jwt
```

## 👥 Tipos de Usuário

- **Cliente**: Pode fazer pedidos, consultar seus próprios dados e pontos
- **Admin**: Acesso completo ao sistema, pode gerenciar usuários, produtos e pedidos

## 📊 Status dos Pedidos

- `Recebido` - Pedido criado
- `Em Preparo` - Pedido sendo preparado
- `Pronto para Retirada` - Pedido finalizado
- `Finalizado` - Pedido entregue

## 🛡️ Middleware de Segurança

- **autenticacao**: Verifica se o usuário está logado
- **verificarAdmin**: Permite acesso apenas para administradores
- **verificarUsuarioOuAdmin**: Permite acesso ao próprio usuário ou admin
- **verificarPermissaoPedido**: Controla acesso aos pedidos
- **verificarPermissaoPontos**: Controla acesso aos pontos

