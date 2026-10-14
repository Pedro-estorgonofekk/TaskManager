# TaskManager

Aplicação de lista de tarefas desenvolvida com React, NestJS, Prisma e PostgreSQL, executada em Docker no Ubuntu Server e acessível pela rede local.

## 📋 Tecnologias

- **Frontend:** React, TypeScript e Vite
- **Servidor/API:** NestJS
- **ORM e migrações:** Prisma
- **Banco de dados:** PostgreSQL 17
- **Servidor web:** Nginx
- **Containers:** Docker e Docker Compose
- **Acesso remoto para desenvolvimento:** VS Code Remote - SSH

## 🏗️ Arquitetura

```text
Dispositivo na rede local
          |
          | http://IP_DO_SERVIDOR:8080
          v
    Frontend / Nginx
       Container
          |
          | /api/*
          v
    Backend / NestJS
       Container
          |
          | PostgreSQL :5432
          v
    PostgreSQL
    Container separado
```

O frontend é servido pelo Nginx na porta `8080` do servidor. O Nginx encaminha as requisições da API ao backend, sem precisar expor a porta `3000` do NestJS para a rede local.

O PostgreSQL roda separadamente, com volume persistente para os dados.

**Importante:** o projeto foi configurado para uso na rede local. Não é necessário usar Playit ou outro túnel para acessar a aplicação em casa.

## 📁 Estrutura do projeto

```text
TaskManager/
├── README.md
├── .env
├── .gitignore
├── compose.yaml
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   ├── docker-compose.yml
│   ├── nest-cli.json
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── prisma.config.ts
│   └── src/
└── frontend/
    ├── Dockerfile
    ├── .dockerignore
    ├── nginx.conf
    ├── package.json
    └── src/
```

## 🖥️ 1. Requisitos

No Ubuntu Server, instale ou confira:

- Docker Engine
- Docker Compose (plugin `docker compose`)
- Git

Verifique a instalação:

```bash
docker --version
docker compose version
git --version
```

Se o Docker exigir permissões administrativas, utilize `sudo` nos comandos.

## 🐘 2. Configuração do PostgreSQL

O PostgreSQL utiliza o arquivo `backend/docker-compose.yml`.

Exemplo de configuração:

```yaml
services:
  postgres:
    image: postgres:17
    container_name: postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: tasksDB
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Para iniciar apenas o PostgreSQL:

```bash
cd ~/TaskManager/backend
sudo docker compose up -d postgres
```

Para conferir o container:

```bash
sudo docker ps
```

Para acessar o banco pelo terminal:

```bash
sudo docker exec -it postgres psql -U admin -d tasksDB
```

Dentro do PostgreSQL, comandos úteis:

```sql
\dt
\q
```

- `\dt`: lista as tabelas.
- `\q`: sai do terminal do PostgreSQL.

**Atenção:** a senha `password` é apenas um exemplo simples. Use uma senha forte em uma instalação real. Se o banco já foi inicializado, mudar `POSTGRES_PASSWORD` no Compose não altera automaticamente a senha armazenada.

O volume `postgres_data` preserva os dados mesmo quando o container é recriado. Nunca execute `docker compose down -v` sem entender que isso pode apagar os volumes do projeto correspondente.

## 🔐 3. Variáveis de ambiente

### Arquivo `backend/.env`

O backend precisa da URL de conexão com o banco.

```env
DATABASE_URL="postgresql://admin:SUA_SENHA@host.docker.internal:5432/tasksDB?schema=public"
```

Substitua `SUA_SENHA` pela senha real configurada no PostgreSQL.

O endereço `host.docker.internal` permite que o container do backend alcance o PostgreSQL publicado na máquina host.

No `compose.yaml` da raiz, o backend utiliza:

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

Essa configuração pressupõe que o PostgreSQL esteja acessível na porta `5432` do host.

### Arquivo `.env` da raiz

Na raiz do projeto, configure o IP local do servidor:

```env
LAN_IP=192.168.1.50
```

Descubra o endereço real com:

```bash
hostname -I
```

Use o IP correspondente à rede local. Se o endereço do servidor mudar, atualize o arquivo `.env`.

**Nunca envie senhas ou credenciais reais ao GitHub.**

## 🐳 4. Docker Compose principal

O arquivo `compose.yaml`, na raiz do projeto, gerencia somente o frontend e o backend.

```yaml
services:
  backend:
    build:
      context: ./backend
    container_name: taskmanager-backend
    restart: unless-stopped
    env_file:
      - ./backend/.env
    environment:
      NODE_ENV: production
      PORT: 3000
    extra_hosts:
      - "host.docker.internal:host-gateway"
    expose:
      - "3000"

  frontend:
    build:
      context: ./frontend
    container_name: taskmanager-frontend
    restart: unless-stopped
    ports:
      - "${LAN_IP:?Configure LAN_IP no arquivo .env}:8080:80"
    depends_on:
      - backend
```

O PostgreSQL é iniciado separadamente pelo Compose localizado em `backend/`.

Antes de iniciar os serviços, valide a configuração:

```bash
cd ~/TaskManager
sudo docker compose config
```

## ⚙️ 5. Dockerfile do backend

Arquivo `backend/Dockerfile`:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN DATABASE_URL="postgresql://admin:build-placeholder@localhost:5432/tasksDB?schema=public" \
    npx prisma generate

RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

O endereço de banco fictício usado durante `prisma generate` é apenas para geração do cliente Prisma durante o build; ele não substitui o `DATABASE_URL` real usado em execução.

No `backend/package.json`, o script de produção precisa apontar para o arquivo gerado pelo build atual do NestJS:

```json
"start:prod": "node dist/src/main.js"
```

Se a configuração do compilador mudar e o arquivo for gerado em outro caminho, ajuste o script de acordo com a saída real do build.

### Arquivo `backend/.dockerignore`

```text
node_modules
dist
.env
.git
coverage
```

## 🌐 6. Dockerfile do frontend

Arquivo `frontend/Dockerfile`:

```dockerfile
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
```

### Arquivo `frontend/nginx.conf`

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location /api/ {
        proxy_pass http://backend:3000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

O `proxy_pass` com a barra final encaminha `/api/tasks` para `/tasks` no backend. Essa configuração precisa corresponder às rotas definidas no NestJS.

### Arquivo `frontend/.dockerignore`

```text
node_modules
dist
.git
```

## 🗄️ 7. Prisma e migrações

Confira `backend/prisma/schema.prisma` para verificar os modelos e a configuração do banco.

Por exemplo, se o modelo de tarefa tiver um campo booleano de conclusão, o valor padrão pode ser definido assim:

```prisma
completed Boolean @default(false)
```

O modelo real deve manter os demais campos e atributos necessários à aplicação.

Depois que o backend estiver iniciado, aplique as migrações existentes:

```bash
cd ~/TaskManager
sudo docker compose exec backend npx prisma migrate deploy
```

Esse comando aplica as migrações já criadas e disponíveis em `backend/prisma/migrations`.

Se a pasta não existir ou estiver vazia, não suponha que o banco está pronto. Verifique o histórico do projeto antes de criar uma migração inicial.

Para consultar o estado dos containers:

```bash
sudo docker compose ps
```

Para acompanhar o backend:

```bash
sudo docker compose logs -f backend
```

## 🚀 8. Primeira inicialização

Depois de configurar os arquivos e as variáveis de ambiente:

```bash
cd ~/TaskManager
```

1. Inicie o PostgreSQL, se ainda não estiver rodando:

   ```bash
   cd backend
   sudo docker compose up -d postgres
   cd ..
   ```

2. Valide o Compose principal:

   ```bash
   sudo docker compose config
   ```

3. Construa e inicie o frontend e o backend:

   ```bash
   sudo docker compose up -d --build
   ```

4. Confira o estado dos serviços:

   ```bash
   sudo docker compose ps
   ```

5. Confira os logs do backend:

   ```bash
   sudo docker compose logs --tail=100 backend
   ```

6. Aplique as migrações existentes:

   ```bash
   sudo docker compose exec backend npx prisma migrate deploy
   ```

7. Acesse a aplicação pelo navegador de um dispositivo na mesma rede:

   ```text
   http://IP_DO_SERVIDOR:8080
   ```

Por exemplo, se o IP for `192.168.1.50`, use `http://192.168.1.50:8080`.

## 🔄 9. Atualizar a aplicação

Após modificar o código, reconstrua somente o serviço alterado.

### Alterações no frontend

```bash
cd ~/TaskManager
sudo docker compose up -d --build frontend
```

### Alterações no backend

```bash
cd ~/TaskManager
sudo docker compose up -d --build backend
```

### Alterações nos arquivos compartilhados ou em ambos

```bash
cd ~/TaskManager
sudo docker compose up -d --build
```

Se uma alteração incluir uma nova migração do banco, aplique-a após iniciar o backend:

```bash
sudo docker compose exec backend npx prisma migrate deploy
```

O build pode consumir CPU e memória e causar lentidão temporária em outros serviços, como um servidor de Minecraft. Planeje reconstruções maiores quando houver menos atividade.

## 🛠️ 10. Comandos úteis

Executar na raiz `~/TaskManager`:

| Ação | Comando |
|---|---|
| Ver containers | `sudo docker compose ps` |
| Ver logs de todos os serviços | `sudo docker compose logs -f` |
| Ver logs do frontend | `sudo docker compose logs --tail=100 frontend` |
| Ver logs do backend | `sudo docker compose logs --tail=100 backend` |
| Reiniciar frontend e backend | `sudo docker compose restart` |
| Parar frontend e backend | `sudo docker compose stop` |
| Iniciar frontend e backend | `sudo docker compose up -d` |
| Reconstruir os serviços | `sudo docker compose up -d --build` |

O Compose da raiz não controla o PostgreSQL iniciado em `backend/` nem outros serviços independentes do servidor. Não execute comandos de parada ou remoção no diretório errado.

## 🧯 11. Solução de problemas

### Erro: `Cannot find module '/app/dist/main'`

O caminho usado pelo script `start:prod` não corresponde ao arquivo gerado pelo NestJS.

Confira:

```bash
ls -la backend/dist
find backend/dist -type f -name 'main.js'
grep '"start:prod"' backend/package.json
```

Ajuste o script para o caminho correto e reconstrua o backend:

```bash
sudo docker compose up -d --build backend
```

### Erro de conexão com o PostgreSQL

Confira:

```bash
sudo docker ps
sudo docker compose logs --tail=100 backend
```

Verifique se:

- O container `postgres` está ativo.
- O banco se chama `tasksDB`.
- O usuário, a senha e a porta estão corretos.
- O `DATABASE_URL` usa `host.docker.internal` para a conexão a partir do container do backend.
- O host possui a porta `5432` acessível pelo backend.

### Erro `P1000` do Prisma

Geralmente indica falha de autenticação. Confira o usuário e a senha reais do PostgreSQL.

### Erro `P1001` do Prisma

Geralmente indica que o banco não está acessível no endereço ou porta informados.

### Erro `P3005` ou migrações pendentes

Confira o histórico em `backend/prisma/migrations` e o estado do banco. Não apague o banco nem recrie o volume para tentar corrigir o erro sem antes verificar os dados e as migrações existentes.

### Frontend abre, mas a API falha

Confira os logs do backend e a configuração de proxy do Nginx. O caminho `/api/tasks` do frontend deve corresponder à rota `/tasks` do backend com a configuração de proxy apresentada neste README.

## 💻 12. Desenvolvimento via VS Code Remote - SSH

Para editar os arquivos do servidor a partir de outro computador:

1. Instale a extensão **Remote - SSH** no VS Code local.
2. Conecte-se ao usuário do Ubuntu Server:

   ```text
   estorgonofe@IP_DO_SERVIDOR
   ```

3. Abra a pasta:

   ```text
   /home/estorgonofe/TaskManager
   ```

As alterações serão feitas diretamente nos arquivos do servidor. Para atualizá-las na aplicação de produção, reconstrua o serviço correspondente conforme a seção 9.

## 🔒 13. Segurança e Git

Não versione arquivos `.env` com senhas reais, tokens ou outros segredos. Use `.env.example` com valores fictícios para documentar as variáveis necessárias.

Confira os arquivos rastreados pelo Git:

```bash
git status
git ls-files | grep -E '(^|/)\.env($|\.)'
```

Se um arquivo secreto já estiver rastreado, o `.gitignore` sozinho não o remove do índice. Remova-o do rastreamento preservando a cópia local, revise o histórico e troque as credenciais se elas já tiverem sido expostas.

O PostgreSQL deste exemplo publica a porta `5432` no host. Em uma instalação mais segura, restrinja essa porta à interface local ou à rede necessária e configure o firewall. Não encaminhe as portas do frontend ou do banco para a internet sem avaliar a segurança.

## 💾 14. Backup

O volume `postgres_data` guarda os dados do PostgreSQL. Para criar um backup lógico, execute no servidor:

```bash
sudo docker exec postgres pg_dump -U admin -d tasksDB > tasksDB-backup.sql
```

Guarde o arquivo em um local seguro, fora do repositório Git. Faça backups regularmente e teste a restauração antes de depender deles.

## 📌 Observações finais

- A aplicação é acessível pela rede local na porta `8080`.
- O frontend e o backend são gerenciados pelo Compose da raiz.
- O PostgreSQL é gerenciado pelo Compose em `backend/`.
- Os dados persistem no volume do PostgreSQL enquanto esse volume for preservado.
- O Minecraft e outros serviços independentes não são gerenciados pelo Compose da raiz do TaskManager.
- Este README descreve a configuração atual; confirme os caminhos e os nomes dos serviços se a estrutura do projeto mudar.
