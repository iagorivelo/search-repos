import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { fetchUser, fetchUserRepos } from "@/lib/github";
import { RepoCard } from "@/components/RepoCard";
import { UserProfile } from "@/components/UserProfile";
import { RepoSkeleton, UserProfileSkeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/ThemeToggle";
import Pagination from "@/components/Pagination";
import type { GithubUser, Repo } from "@/types/github";

const PER_PAGE = 10;

interface RepositorioPageProps {
  params: { name: string };
  searchParams: { page?: string };
}

export default function RepositorioPage({
  params,
  searchParams,
}: RepositorioPageProps) {
  const username = params.name;
  const page = Math.max(1, Number(searchParams.page) || 1);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <ThemeToggle />
        </div>

        <Suspense key={`${username}-${page}`} fallback={<ResultsSkeleton />}>
          <Results username={username} page={page} />
        </Suspense>
      </div>
    </main>
  );
}

async function Results({
  username,
  page,
}: {
  username: string;
  page: number;
}) {
  let user: GithubUser | null = null;
  let repos: Repo[] = [];
  let error: string | null = null;

  try {
    [user, repos] = await Promise.all([
      fetchUser(username),
      fetchUserRepos(username, page, PER_PAGE),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Erro desconhecido";
  }

  const totalCount = user?.public_repos ?? null;
  const totalPages = totalCount
    ? Math.max(1, Math.ceil(totalCount / PER_PAGE))
    : page;
  const basePath = `/repositorio/${encodeURIComponent(username)}`;

  return (
    <>
      {user && <UserProfile user={user} />}

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          {totalCount != null
            ? `${totalCount.toLocaleString("pt-BR")} repositórios`
            : "Repositórios"}
        </p>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {!error && repos.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-16">
            Nenhum repositório encontrado.
          </p>
        )}

        {repos.length > 0 && (
          <ul className="space-y-3">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </ul>
        )}
      </div>

      {!error && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} basePath={basePath} />
      )}
    </>
  );
}

function ResultsSkeleton() {
  return (
    <>
      <UserProfileSkeleton />
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Repositórios</p>
        <ul className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <RepoSkeleton key={i} />
          ))}
        </ul>
      </div>
    </>
  );
}
