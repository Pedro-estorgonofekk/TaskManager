<h1 align="center">Task Menager</h1>

## Como executar:
  ### Requisitos
  - NodeJS
    - Acesse o site: https://nodejs.org/pt-br/download
  
  <br>

  - Docker:
    - Acesse o site: https://www.docker.com/get-started/

<br>

## Estrutura de Pastas:

```
backend/
 ├── src/
 │   ├── tasks/
 │   ├── prisma/
 ├── prisma/
 ├── docker-compose.yml
 └── package.json
```

- Acessar o diretorio 'backend':
  ```bash
  cd backend
  ```
- Para executar o backend:
  - Rode o comando:
    ```bash
    npm run start
    ```
  - Ou para executar modo de desenvolvimento:
    ```bash
    npm run start:dev
    ```

- Para executar a visualização de tabelas do prisma:
  - Rode o comando:
    ```bash
    npx prisma studio
    ```

- Para executar o docker:
  - Rode o comando:
    ```bash
    docker compose up -d
    ```
  - Caso ja tenha executado o comando acima, para iniciar:
    ```bash
    docker compose start
    ```

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