import { Users } from "lucide-react";

import type { GithubUser } from "@/types/github";

interface UserProfileProps {
  user: GithubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-zinc-200 rounded-xl">
      <img
        src={user.avatar_url}
        alt={`Avatar de ${user.login}`}
        width={56}
        height={56}
        className="rounded-full shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h1 className="font-semibold text-zinc-900 truncate">
            {user.name ?? user.login}
          </h1>
          <span className="text-sm text-zinc-400">@{user.login}</span>
        </div>

        {user.bio && (
          <p className="text-sm text-zinc-500 mt-0.5 line-clamp-1">{user.bio}</p>
        )}

        <div className="flex items-center gap-3 mt-1.5 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {user.followers.toLocaleString("pt-BR")} seguidores
          </span>
          <span>·</span>
          <span>{user.following.toLocaleString("pt-BR")} seguindo</span>
        </div>
      </div>
    </div>
  );
}
