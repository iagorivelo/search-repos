"use client";

import { useEffect, useState } from "react";
import { fetchUserRepos, fetchUserTotalRepos, Repo } from "@/lib/github";

export function useGithubRepos(username: string, perPage: number = 10) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  /* Vai buscar o total de repositórios do usuário */
  useEffect(() => {
    if (!username) return;

    const loadTotal = async () => {
      try {
        const total = await fetchUserTotalRepos(username);
        setTotalCount(total);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadTotal();
    setPage(1);
  }, [username]);

  /* Vai buscar os repositórios da página atual */
  useEffect(() => {
    if (!username) return;

    const loadRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUserRepos(username, page, perPage);
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, [username, page, perPage]);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  const hasMore = totalCount ? page * perPage < totalCount : repos.length === perPage;

  return {
    repos,
    loading,
    error,
    page,
    perPage,
    totalCount,
    nextPage,
    prevPage,
    setPage,
    hasMore,
  };
}
