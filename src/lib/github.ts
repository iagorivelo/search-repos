import type { GithubUser, Repo } from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";

const DEFAULT_HEADERS = {
  Accept: "application/vnd.github.v3+json",
};

async function githubFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: DEFAULT_HEADERS,
    next: { revalidate: 60 },
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
  return githubFetch<Repo[]>(
    `/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`
  );
}

export async function fetchUser(username: string): Promise<GithubUser> {
  return githubFetch<GithubUser>(`/users/${username}`);
}
