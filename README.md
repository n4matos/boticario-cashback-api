# Boticario Cashback API


# Projeto

Para desenvolvimento do projeto foi utilizado Node.js eTypescript juntamente com o MondoDB.


# Guia rápido

Para rodar o projeto, precisará ter instalado na máquina a versão 16.3 do Node.js e Docker.

## Instruções

1. Digite `npm i` para instalar as dependências necessárias.
2. Digite `sudo docker-compose up -d` para ter uma instância do MongoDB funcionando.
3. Crie o seu próprio arquivo `.env`, crie uma cópia do arquivo .env.example e renomeie o mesmo para `.env`.
4. À partir dai, todos os comandos abaixo devem funcionar:

Para rodar os testes da aplicação:

  - `npm run test`

Para rodar os testes da aplicação no modo debug:

  - `npm run test-debug`

Para inicializar a aplicação:

  - `npm start`

  Para inicializar a aplicação no modo debug (ambiente de desenvolvimento):
  
  - `npm run debug`
