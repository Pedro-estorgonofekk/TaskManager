# Desafio Técnico | Gerenciador de Tarefas (Node.js, React, Python e IA)

## Objetivo
Desenvolver uma aplicação simples de gerenciamento de tarefas utilizando:
- **Backend:** Node.js + NestJS  
- **Frontend:** React ( utilizando Vite )  
- **Opcional:** Microsserviço em Python para sugestão de título de tarefas  

---

## Funcionalidades do Sistema
O sistema de **Tarefas (Tasks)** deve permitir ao usuário:

- Criar uma nova tarefa  
- Listar todas as tarefas
    - Por ordem decrescente ( da mais antiga para mais recente )
    - Listar por último as concluídas e indicar visualmente       
- Editar título e descrição da tarefa  
- Marcar tarefa como concluída  
- Marcar tarefa como não concluída  
- Deletar uma tarefa  
- *(Opcional)* Obter sugestão automática de título para uma nova tarefa consumindo uma API de IA ( GPT, Gemini, Claude, Deepseek etc)  

---

## Arquitetura
A aplicação deve ser dividida em:

- **Backend:** API REST em Node.js + NestJS  
- **Frontend:** Aplicação simples em React ( para estilização, sugiro a biblioteca [Chakra UI](https://chakra-ui.com/) )  
- **(Opcional) Microsserviço:** Serviço em Python consumido pelo backend  

---

## Backend – Node.js + NestJS

### Requisitos Gerais

- API REST
- Armazenamento dos dados **em banco de dados Postgres**

### Rotas Obrigatórias

- `POST /tasks`  
  Cria uma nova tarefa  
  ```json
  {
    "title": "string",
    "description": "string",
    "completed": false
  }
  ```

- `GET /tasks`  
  Lista todas as tarefas

- `PUT /tasks/:id`  
  Edita o title e o description de uma tarefa

- `PATCH /tasks/:id/complete`  
  Marca a tarefa como concluída

- `PATCH /tasks/:id/incomplete`  
  Marca a tarefa como não concluída

- `DELETE /tasks/:id`  
  Remove uma tarefa

### Rota Opcional

- `GET /tasks/suggest-title`  
  Deve consumir o microsserviço Python e retornar a sugestão de título


## Frontend – React

### Requisitos

- Página única
- Design simples (a documentação do Chakra UI tem vários exemplos prontos para reutilização )

### Funcionalidades

- Listar tarefas
- Criar nova tarefa
- Editar título e descrição
- Marcar tarefa como concluída/não concluída
- Deletar tarefa com confirmação
- (Opcional) Botão para sugerir título automaticamente


## Microsserviço – Python (Opcional)

### Requisitos

- Pode utilizar Flask ou FastAPI
- Consumido apenas pelo backend Node.js

### Rota

- `GET /suggest-title`

### Resposta

```json
{
  "title": "Comprar mantimentos"
}
```


## Observações

- **Uso de IA NÃO É PERMITIDO para geração de código**. Apenas use com o  objetivo de referência e estudo das tecnologias
- Você DEVE ser capaz de explicar todo o código
- Não é necessário realizar deploy
- Organização, clareza são um imperativo


## Entrega

- Fork do repositório original
- Estrutura de pastas:

    ```
    ├── backend/      → API RESTful (Node.js + NestJS + Postgres)
    ├── frontend/     → Aplicação Web (Vite + React + TypeScript)
    └── services/     → Microsserviço em Python
    ```

- Incluir um README.md com:
  - Instruções para rodar o backend
  - Instruções para rodar o frontend
  - Instruções para rodar o microsserviço e como configurá-lo


## Guias

### Fork do Projeto
- Acessar o repositório original
  - Navegue até o repositório principal no GitHub
  - Clique no botão "Fork" no canto superior direito
  - Selecione sua conta pessoal/organização como destino

### Como rodar
- Instalar o node
  - Acesse o site https://[nodejs.org](https://nodejs.org/pt-br/download)
  
- Acessar o diretorio 'backend'
  ```bash
  cd backend
  ```

- Para rodar o prisma:
  - Rode o comando:
  ```bash
  npx prisma studio
  ```

- Para rodar o docker:
  - Rode o comando
  ```bash
  docker compose up -d
  ```

### Convenção de Mensagens de Commit

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) com os seguintes tipos:

### Tipos Principais

- **feat**: Nova funcionalidade  

  ```bash
  git commit -m "feat: adicionar criação de tarefas"
  git commit -m "feat(frontend): implementar modal de edição"
  ```
- **fix**: Correção de bug  

  ```bash
  git commit -m "fix: corrigir validação de título vazio"
  git commit -m "fix(backend): resolver problema de ordenação de tarefas"
  ```
- **docs**: Alterações na documentação  

  ```bash
  git commit -m "docs: atualizar README com instruções de instalação"
  git commit -m "docs(api): adicionar exemplos de uso das rotas"
  ```
- **style**: Formatação, espaços, ponto e vírgula (não altera lógica) 

  ```bash
  git commit -m "style: formatar código com prettier"
  ```
- **refactor**: Refatoração de código (sem adicionar funcionalidade nem corrigir bug)  

  ```bash
  git commit -m "refactor: extrair lógica de validação para service"
  ```
- **test**: Adicionar ou corrigir testes 

  ```bash
  git commit -m "test: adicionar testes para criação de tarefas"
  ```
- **chore**: Atualização de dependências, tarefas de build, configurações

  ```bash
  git commit -m "chore: atualizar dependências do npm"
  git commit -m "chore(ci): configurar GitHub Actions"
  ```
- **build**: Alterações que afetam o sistema de build  

  ```bash
  git commit -m "build: configurar webpack para produção"
  ```

---

## Estrutura Completa

```text
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

```

- **tipo**: um dos tipos listados acima (`feat`, `fix`, `docs`, etc.).  
- **escopo**: seção do código afetada (por exemplo, `frontend`, `api`, `ci`).  
- **descrição**: resumo curto e imperativo do que mudou.  
- **corpo** (opcional): detalhes do que foi feito e o porquê.  

---

## Exemplos

1. Commit simples  
   ```bash
   git commit -m "feat: implementar exclusão de tarefas"
   ```

2. Commit com escopo  
   ```bash
   git commit -m "feat(backend): adicionar endpoint PATCH para completar tarefas"
   ```

3. Commit com corpo  
   ```bash
   git commit -m "fix: corrigir ordenação decrescente de tarefas

   A ordenação estava invertida, mostrando as mais recentes primeiro.
   Agora exibe corretamente da mais antiga para a mais recente."
   ```
