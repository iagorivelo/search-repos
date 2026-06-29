# 🔍 Search Repos

Uma aplicação web para procurar os repositórios públicos de qualquer usuário do GitHub de forma rápida, limpa e sem frescura.

---

## ✨ O que ela faz

Você digita um nome de usuário do GitHub, aperta Enter e pronto: vê todos os repositórios públicos daquela pessoa, com linguagem, estrelas, forks e quando foi atualizado pela última vez. Tem paginação (via URL, `?page=N`), perfil do usuário, skeleton de loading enquanto os dados chegam e tema claro/escuro.

Os dados são buscados no **servidor** (Server Components), então a página já chega renderizada e o token da API nunca vai parar no browser.

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
│   ├── Pagination.tsx               # paginação com ellipsis (links ?page=N)
│   ├── RepoCard.tsx                 # card de repositório
│   ├── ThemeToggle.tsx              # botão de tema claro/escuro
│   └── UserProfile.tsx              # card de perfil do usuário
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

A GitHub API tem um limite de **60 requisições por hora** para chamadas sem autenticação. Se você for testar bastante, vale criar um token:

**1. Gere um token em:** [github.com/settings/tokens](https://github.com/settings/tokens)
> Não precisa de nenhum escopo — um token básico já resolve.

**2. Crie um arquivo `.env.local` na raiz do projeto:**

```env
GITHUB_TOKEN=seu_token_aqui
```

Pronto. Como o fetch roda no servidor, o [`src/lib/github.ts`](src/lib/github.ts) lê essa variável **automaticamente** e adiciona o header `Authorization` — sem editar código e sem expor o token no browser. Com isso, o limite sobe para **5.000 requisições por hora**.

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

**Por que buscar no servidor (Server Components)?**
A listagem (`/repositorio/[name]`) é um Server Component assíncrono que busca perfil e repositórios em paralelo (`Promise.all`). Isso deixa o token seguro (nunca chega ao browser), faz o cache do `fetch` valer de verdade, melhora o first paint e o SEO.

**Por que `next: { revalidate: 60 }` no fetch?**
Os dados ficam em cache por 60 segundos no servidor. Suficiente pra não bater na API a cada clique de paginação. (Esse cache só funciona porque o fetch é server-side — no browser ele seria ignorado.)

**Por que paginação por URL (`?page=N`)?**
O estado da página vive na URL, então cada página é linkável/compartilhável, funciona com voltar/avançar do navegador e até sem JS. A troca de página remonta o `<Suspense>` (via `key`), reexibindo o skeleton.

**Por que `encodeURIComponent` no username?**
Pra um nome com caracteres especiais não quebrar (ou manipular) a URL da API do GitHub.

**Por que dark mode com tokens semânticos?**
Os componentes usam `bg-background`, `text-foreground`, `bg-card` etc. (variáveis em [`globals.css`](src/app/globals.css)) em vez de cores fixas. Um único `.dark` no `<html>` troca o tema inteiro, sem `dark:` espalhado pelo código. Um script inline no layout aplica o tema antes da primeira pintura pra evitar flash.

---

## 🤝 Contribuindo

Achou um bug? Tem uma ideia? Abre uma issue ou um PR, sem cerimônia.
