<h1 align="center">Task Manager</h1>

## Estrutura de Pastas:

```
backend/
 ├── src/
 │   ├── tasks/
 │   ├── prisma/
 ├── prisma/
 ├── docker-compose.yml
 ├── .env
 └── package.json
```
## Executando o Backend:
  ### Requisitos
  - NodeJS
    - Acesse o site: [NodeJS Dowload](https://nodejs.org/pt-br/download)

  - Docker:
    - Acesse o site: [Docker Desktop Dowload](https://www.docker.com/get-started/)

<br>

- Acessar o diretorio `backend`:
  ```bash
  cd backend
  ```

<br>

- Forneça um arquivo `.env` na raiz do backend com o modelo de acordo com o `docker-compose.yml`:
    ```bash
    DATABASE_URL=postgresql://USUARIO:SENHA@PROVEDOR:PORTA/NOMEBANCO?schema=public
    ```

<br>

- Para executar o docker:
  - Rode o comando:
    ```bash
    docker compose up -d
    ```
  - Caso ja tenha executado o comando acima, para iniciar novamente:
    ```bash
    docker compose start
    ```

<br>

- Para executar o NodeJS + NestJS:
  - Instale as dependencias:
    ```bash
    npm install
    ```
    - Configurar o Prisma:

        - Gerar o Prisma Client:
          ```bash
          npx prisma generate
          ```
        - Executar as migrações:
          ```bash
          npx prisma migrate dev
          ```
          - Se ocorrer erro relacionado ao Prisma Client (ex.: `@prisma/client` ou `PrismaClient`), reinstale e gere novamente:
            ```bash
            npm i @prisma/client
            npm i -D prisma
            npx prisma generate
            ```
  - Rode o comando:
    ```bash
    npm run start
    ```
    - Ou para executar modo de desenvolvimento:
      ```bash
      npm run start:dev
      ```

- Para executar a visualização de tabelas do prisma(opcional):
  - Rode o comando:
    ```bash
    npx prisma studio
    ```
- Caso opte por utilizar o arquivo `rotas.http` para as requisições, sera necessario instalar a extensão REST Client no seu Visual Studio Code:

  [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

<br>

## Parando o projeto:
- Parar o docker:
  - Rode o comando:
    ```bash
    docker compose stop
    ```
- Parar o `backend` e o Prisma Studio:
  - No terminal
    ```bash
    ctrl+c
    ```

## Possíveis Erros:
- Erro ao executar `npm`, possivelmente sera necessario dar permissão para a execução de scripts:
  - No PowerShell como administrador:
    ```bash
    Set-ExecutionPolicy RemoteSigned
    ```

- Sobre `npm audit` e vulnerabilidades:
  - Rode o comando:
    ```bash
    npm audit fix
    ```
    O `npm` pode mostrar vulnerabilidades moderadas em dependências indiretas. Isso não impede rodar o projeto.

- Erro de `wsl` acontece no windows pois o docker utiliza do `wsl` para executar a maquina virtual sendo necessário executar:
    ```bash
    wsl --update
    ```