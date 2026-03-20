# 🔍 Search Repos

Uma aplicação web para procurar os repositórios públicos de qualquer usuário do GitHub de forma rápida, limpa e sem frescura.

---

## ✨ O que ela faz

Você digita um nome de usuário do GitHub, aperta Enter e pronto: vê todos os repositórios públicos daquela pessoa, com linguagem, estrelas, forks e quando foi atualizado pela última vez. Tem paginação, perfil do usuário e skeleton de loading enquanto os dados chegam.

---

## 🛠️ Tecnologias

- **[Next.js 14](https://nextjs.org/)** — App Router
- **[TypeScript](https://www.typescriptlang.org/)** — tipagem em tudo
- **[Tailwind CSS](https://tailwindcss.com/)** — estilização utility-first
- **[Lucide React](https://lucide.dev/)** — ícones
- **[GitHub REST API](https://docs.github.com/en/rest)** — fonte dos dados

---

## 📁 Estrutura do projeto

```
src/
├── app/
│   ├── globals.css                  # variáveis de tema (paleta zinc)
│   ├── layout.tsx                   # layout raiz, metadata, fonte
│   ├── page.tsx                     # tela inicial com campo de busca
│   └── repositorio/[name]/
│       └── page.tsx                 # listagem de repositórios do usuário
│
├── components/
│   ├── ui/
│   │   └── skeleton.tsx             # skeletons de loading
│   ├── Pagination.tsx               # paginação com ellipsis
│   ├── RepoCard.tsx                 # card de repositório
│   └── UserProfile.tsx              # card de perfil do usuário
│
├── hooks/
│   └── useGithubRepos.ts            # lógica de busca + paginação
│
├── lib/
│   ├── github.ts                    # wrapper da GitHub API
│   └── utils.ts                     # cn() + formatRelativeDate()
│
└── types/
    └── github.ts                    # tipos Repo e GithubUser
```

---

## 🚀 Como rodar localmente

Antes de tudo, você vai precisar do [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

**1. Clone o repositório**

```bash
git clone https://github.com/iagorivelo/search-repos.git
cd search-repos
```

**2. Instale as dependências**

```bash
npm install
```

**3. Suba o servidor de desenvolvimento**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) e pronto.

---

## 🔑 Variável de ambiente (opcional, mas recomendado)

A GitHub API tem um limite de **60 requisições por hora** para chamadas sem autenticação. Se você for testar bastante, vale criar um token e configurar:

**1. Crie um arquivo `.env.local` na raiz do projeto:**

```env
GITHUB_TOKEN=seu_token_aqui
```

**2. Gere um token em:** [github.com/settings/tokens](https://github.com/settings/tokens)
> Não precisa de nenhum escopo — um token básico já resolve.

**3. Use o token no `src/lib/github.ts`:**

```ts
const DEFAULT_HEADERS = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};
```

Com isso, o limite sobe para **5.000 requisições por hora**.

---

## 📦 Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Roda o build de produção localmente |
| `npm run lint` | Roda o ESLint no projeto |

---

## 🖼️ Preview

| Tela inicial | Listagem de repos |
|---|---|
| Campo de busca centralizado e limpo | Perfil do usuário + cards com linguagem, ⭐ e forks |

---

## 🧠 Decisões técnicas

**Por que `next: { revalidate: 60 }` no fetch?**
Em vez de `cache: "no-store"` em tudo (que não aproveita nada), os dados ficam em cache por 60 segundos. Suficiente pra não bater na API a cada clique de paginação.

**Por que cleanup no `useEffect`?**
Se o usuário digitar um nome e trocar antes da resposta chegar, a requisição antiga não vai sobrescrever o estado novo. Evita race conditions.

**Por que `useCallback` nos `nextPage` / `prevPage`?**
As funções não são recriadas a cada render, o que deixa a referência estável caso você passe elas como props adiante.

---

## 🤝 Contribuindo

Achou um bug? Tem uma ideia? Abre uma issue ou um PR, sem cerimônia.
