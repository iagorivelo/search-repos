"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useGithubRepos } from "@/hooks/useGithubRepos";
import { RepoCard } from "@/components/RepoCard";
import { UserProfile } from "@/components/UserProfile";
import { RepoSkeleton, UserProfileSkeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/Pagination";

interface RepositorioPageProps {
  params: { name: string };
}

export default function RepositorioPage({ params }: RepositorioPageProps) {
  const router = useRouter();

  const {
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
  } = useGithubRepos(params.name, 10);

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        {user ? <UserProfile user={user} /> : loading && <UserProfileSkeleton />}

        <div className="space-y-3">
          <p className="text-sm font-medium text-zinc-500">
            {totalCount != null
              ? `${totalCount.toLocaleString("pt-BR")} repositórios`
              : "Repositórios"}
          </p>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {loading ? (
            <ul className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <RepoSkeleton key={i} />
              ))}
            </ul>
          ) : (
            <>
              {!error && repos.length === 0 && (
                <p className="text-sm text-zinc-400 text-center py-16">
                  Nenhum repositório encontrado.
                </p>
              )}
              <ul className="space-y-3">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </ul>
            </>
          )}
        </div>

        {!loading && !error && repos.length > 0 && (
          <Pagination
            page={page}
            perPage={perPage}
            totalCount={totalCount ?? undefined}
            hasMore={hasMore}
            onPrev={prevPage}
            onNext={nextPage}
            onPageChange={setPage}
          />
        )}
      </div>
    </main>
  );
}
