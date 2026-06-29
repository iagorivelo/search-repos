import Image from "next/image";
import { Users } from "lucide-react";

import type { GithubUser } from "@/types/github";

interface UserProfileProps {
  user: GithubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
      <Image
        src={user.avatar_url}
        alt={`Avatar de ${user.login}`}
        width={56}
        height={56}
        className="rounded-full shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h1 className="font-semibold text-foreground truncate">
            {user.name ?? user.login}
          </h1>
          <span className="text-sm text-muted-foreground">@{user.login}</span>
        </div>

        {user.bio && (
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{user.bio}</p>
        )}

        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
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
