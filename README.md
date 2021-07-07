# Boticario Cashback API


# Projeto

Para desenvolvimento do projeto foi utilizado Node.js, Typescript juntamente com o MongoDB.

# Guia rápido

Para rodar o projeto, precisa ter instalado a versão 16.3 do Node.js, Docker e Docker Compose.

# Checklist requisitos + diferenciais

- [x] Nodejs;
- [x] Banco de dados relacional ou não relacional;
- [x] Testes unitários;
- [x] Testes de integração; 
- [x] Autenticação JWT; 

# Arquitetura

Para o desenvolvimento da API, minha intenção foi desenvolver uma api com uma estrutura maleável/escalável que respeitasse as boas práticas e os princípios SOLID.

Estrutura da aplicação:

- Routes: Definir as solicitações que a API pode manipular.
- Services: Para tarefas como conexão aos nossos modelos de banco de dados, fazer consultas ou conectar-se a serviços externos.
- Middleware: Para validar solicitações específicas antes que o Controller tenha de tratar suas especificidades.
- Models: Para definir modelos de dados correspondentes a um determinado esquema de banco de dados, para facilitar o armazenamento e recuperação de dados.
- Controllers: Para separar a configuração das rotas do código que (após qualquer middleware) processa uma solicitação da rota, chama as funções de serviço se necessário, e retorna uma resposta ao cliente.

## Instruções

1. Digite `npm i` para instalar as dependências necessárias.
2. Digite `npm i -g migrate-mongo` para instalar a dependência global do migrate-mongo.
3. Digite `sudo docker-compose up -d` para ter uma instância do MongoDB funcionando.
4. Digite o comando `migrate-mongo up` para realizar a criação do primeiro usuário.
5. A partir dai, todos os comandos abaixo devem funcionar:

Para rodar os testes da aplicação:

  - `npm run test`

Para rodar os testes da aplicação no modo debug:

  - `npm run test-debug`

Para inicializar a aplicação:

  - `npm start`

  Para inicializar a aplicação no modo debug (ambiente de desenvolvimento):
  
  - `npm run debug`
