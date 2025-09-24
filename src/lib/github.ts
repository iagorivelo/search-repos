export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
};

export async function fetchUserRepos(
  username: string,
  page: number = 1,
  perPage: number = 10
): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`,
    {
      headers: {
        "Accept": "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar repositórios");
  }

  return res.json();
}

export type User = {
  login: string;
  public_repos: number;
};

export async function fetchUserTotalRepos(username: string): Promise<number> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      "Accept": "application/vnd.github.v3+json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Usuário não encontrado");
  }

  const data: User = await res.json();
  return data.public_repos;
}
