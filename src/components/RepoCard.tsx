import { ExternalLink, GitFork, Star } from "lucide-react";

import { formatRelativeDate } from "@/lib/utils";
import type { Repo } from "@/types/github";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Rust: "#dea584",
  Go: "#00ADD8",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

interface RepoCardProps {
  repo: Repo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const langColor = repo.language
    ? (LANGUAGE_COLORS[repo.language] ?? "#94a3b8")
    : null;

  return (
    <li className="group bg-white border border-zinc-200 rounded-xl p-4 hover:border-zinc-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-900 hover:text-zinc-500 transition-colors text-sm truncate"
        >
          {repo.name}
        </a>
        <ExternalLink className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-400 transition-colors shrink-0 mt-0.5" />
      </div>

      {repo.description && (
        <p className="text-sm text-zinc-500 mt-1.5 line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}

      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-zinc-400">
        {langColor && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </span>
        )}

        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {repo.stargazers_count.toLocaleString("pt-BR")}
        </span>

        <span className="flex items-center gap-1">
          <GitFork className="w-3 h-3" />
          {repo.forks_count.toLocaleString("pt-BR")}
        </span>

        <span className="ml-auto">Atualizado {formatRelativeDate(repo.updated_at)}</span>
      </div>
    </li>
  );
}
