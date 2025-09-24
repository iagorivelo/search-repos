"use client";

import { useGithubRepos } from "@/hooks/useGithubRepos";
import Pagination from "@/components/Pagination";

export default function Repositorio({ params }: { params: { name: string } }) {
  const {
    repos,
    loading,
    error,
    page,
    totalCount,
    nextPage,
    prevPage,
    perPage,
    hasMore,
    setPage,
  } = useGithubRepos(params.name as string, 10);

  return (
    <main className="bg-black/90 min-h-screen p-12 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Repositórios de <span className="text-indigo-400">{params.name}</span>
      </h1>

      {loading && <p>🔄 Carregando...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {!loading && !error && repos.length === 0 && (
        <p>Nenhum repositório encontrado.</p>
      )}

      <ul className="grid gap-4 mt-6">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="bg-indigo-700/30 border border-indigo-600 rounded-md p-2 hover:bg-indigo-600/40 transition"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-indigo-300 hover:underline"
            >
              {repo.name}
            </a>
            {repo.description && (
              <p className="text-gray-300 mt-2">{repo.description}</p>
            )}
          </li>
        ))}
      </ul>

      <Pagination
        page={page}
        perPage={perPage}
        totalCount={totalCount ?? undefined}
        hasMore={hasMore}
        onPrev={prevPage}
        onNext={nextPage}
        onPageChange={setPage}
      />
    </main>
  );
}
