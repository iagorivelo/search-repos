"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchUser, fetchUserRepos } from "@/lib/github";
import type { GithubUser, Repo } from "@/types/github";

export interface UseGithubReposReturn {
  repos: Repo[];
  user: GithubUser | null;
  loading: boolean;
  error: string | null;
  page: number;
  perPage: number;
  totalCount: number | null;
  hasMore: boolean;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

export function useGithubRepos(
  username: string,
  perPage = 10
): UseGithubReposReturn {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Reseta estado quando o usuário muda
  useEffect(() => {
    setPage(1);
    setUser(null);
    setError(null);
  }, [username]);

  // Busca perfil do usuário (uma vez por username)
  useEffect(() => {
    if (!username) return;

    fetchUser(username)
      .then(setUser)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      });
  }, [username]);

  // Busca repositórios com cleanup para evitar race conditions
  useEffect(() => {
    if (!username) return;

    let cancelled = false;

    const loadRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUserRepos(username, page, perPage);
        if (!cancelled) setRepos(data);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Erro desconhecido");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadRepos();

    return () => {
      cancelled = true;
    };
  }, [username, page, perPage]);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);

  const totalCount = user?.public_repos ?? null;
  const hasMore =
    totalCount != null
      ? page * perPage < totalCount
      : repos.length === perPage;

  return {
    repos,
    user,
    loading,
    error,
    page,
    perPage,
    totalCount,
    hasMore,
    nextPage,
    prevPage,
    setPage,
  };
}
