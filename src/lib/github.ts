import type { GithubUser, Repo } from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";

// Cache de dados do Next (server-side, compartilhado entre todos os visitantes):
// a 1ª requisição busca na API do GitHub e guarda o resultado; as próximas, dentro
// da janela abaixo, vêm do cache sem bater na API. Cada URL (usuário + página) é
// cacheada separadamente.
const REVALIDATE_SECONDS = 60 * 60; // 1 hora

// Roda no servidor (Server Components), então o token nunca chega ao browser.
// Sem token: 60 req/h. Com token: 5.000 req/h.
function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function githubFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: buildHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("Usuário não encontrado");
    if (res.status === 403) throw new Error("Limite de requisições da API atingido");
    throw new Error("Erro ao buscar dados do GitHub");
  }

  return res.json();
}

export async function fetchUserRepos(
  username: string,
  page = 1,
  perPage = 10
): Promise<Repo[]> {
  const user = encodeURIComponent(username);
  return githubFetch<Repo[]>(
    `/users/${user}/repos?page=${page}&per_page=${perPage}&sort=updated`
  );
}

export async function fetchUser(username: string): Promise<GithubUser> {
  return githubFetch<GithubUser>(`/users/${encodeURIComponent(username)}`);
}
