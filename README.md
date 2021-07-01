# Boticario Cashback API


# Projeto

Para desenvolvimento do projeto foi utilizado Node.js, Typescript juntamente com o MongoDB.

# Guia rápido

Para rodar o projeto, precisa ter instalado a versão 16.3 do Node.js, Docker e Docker Compose.

## Instruções

1. Digite `npm i` para instalar as dependências necessárias.
2. Digite `sudo docker-compose up -d` para ter uma instância do MongoDB funcionando.
3. Digite o comando `migrate-mongo up` para realizar a criação do primeiro usuário.
4. À partir dai, todos os comandos abaixo devem funcionar:

Para rodar os testes da aplicação:

  - `npm run test`

Para rodar os testes da aplicação no modo debug:

  - `npm run test-debug`

Para inicializar a aplicação:

  - `npm start`

  Para inicializar a aplicação no modo debug (ambiente de desenvolvimento):
  
  - `npm run debug`
