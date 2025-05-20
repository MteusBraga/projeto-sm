# Nome do Projeto
> ENEM+ | Plataforma Inteligente de Estudos para o ENEM

## 👨‍🎓 Integrantes
- Mateus Braga de Melo

## 💡 Ideia Principal
O projeto propõe uma plataforma online onde estudantes que se preparam para o ENEM podem gerar questões personalizadas com base na área do conhecimento, dificuldade e ano da prova. Além disso, a plataforma oferece um painel (dashboard) para acompanhar o progresso e desempenho ao longo do tempo, ajudando os usuários a estudarem de forma mais eficiente e direcionada.

## 🎯 Objetivos
- Ajudar estudantes a se prepararem melhor para o ENEM com questões no estilo da prova.
- Permitir a personalização das questões por ano, matéria e dificuldade.
- Acompanhar o desempenho individual dos usuários com gráficos e estatísticas.
- Fornecer uma interface simples, intuitiva e acessível.

## 👥 Público-Alvo
Estudantes do ensino médio e pessoas que desejam prestar o ENEM, especialmente aquelas que estudam por conta própria e precisam de uma ferramenta prática e personalizada.

## 🤖 Agentes Envolvidos
- **Agente gerador:** gera questões multidisciplinares e com diferentes níveis de dificuldade e retorna em formato json.
- **Agente revisor:** valida a correção do conteúdo, gramática, estilo e clareza das alternativas.
- **Agente validador:** detecta possíveis ambiguidades ou múltiplas corretas.
- **Agente de feedback:** avaliar resposta do aluno e fornecer um feedback bem detalhado.

## 🧱 Tecnologias Pretendidas
- **Linguagem de programação:** TypeScript
- **Front-end:** Nextjs
- **Back-end:** Node.js + Express 
- **Banco de dados:** SQLite 
- **LLM (modelo de linguagem):** OpenAI GPT ou similar 
- **Versionamento:** Git + GitHub

> Essas ferramentas foram escolhidas por serem amplamente usadas, terem boa documentação e permitirem desenvolvimento rápido e eficiente.

## 📦 Entradas e Saídas Esperadas
**Entradas:**
- Filtros escolhidos pelo usuário (assunto, disciplina, nível de dificuldade)
- Respostas do usuário às questões

**Saídas:**
- Questões geradas por llm
- Feedback de acertos e erros
- Estatísticas de desempenho no dashboard

## 🔁 Interação entre os Agentes

```plaintext
[Usuário escolhe parâmetros]
         ↓
[Agente Gerador]
         ↓
[Agente Revisor] → [Agente Validador]
         ↓
[Questão validada]
         ↓
[Frontend exibe questão ao aluno]
         ↓
[Usuário responde]
         ↓
[Agente de Feedback gera resposta explicativa]
         ↓
[Dashboard registra desempenho e mostra progresso]
```


## 🗂️ Organização e Planejamento do Projeto
- Tarefas pendentes
  - Dashboard
  - implementação dos agentes
- Tarefas em andamento
  - Implementar
  - componente listagem de questoes
  - signin front
- Tarefas concluídas
  - escolha das tecnologias
  - signin / signup (backend)
  - signup (frontend)
  - componente filtro
  - autenticação jwt
     
Cada integrante será responsável por pelo menos uma tarefa no quadro.
Utilizaremos etiquetas (labels) e comentários para detalhar decisões e progresso.

## 📌 Status Inicial do Projeto
- [X] Ideia discutida e validada com o professor
- [X] Estrutura básica do repositório criada
- [X] Quadro no GitHub Projects criado
- [X] Primeiras tarefas definidas e atribuídas

## 📄 Documentação Futura
Este repositório incluirá:
- Relatórios de progresso do desenvolvimento
- Scripts para testes de funcionalidades
- Resultados finais e conclusões do projeto

## 👨‍🏫 Acompanhamento pelo Professor
[Igor Costa](https://github.com/igorbarcosta)

