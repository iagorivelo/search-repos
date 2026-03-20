"use client";

import { type KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = username.trim();
    if (trimmed) router.push(`/repositorio/${trimmed}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-900 mb-4">
            <Search className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            Search Repos
          </h1>
          <p className="text-sm text-zinc-500">
            Procure por repositórios públicos de qualquer usuário do GitHub
          </p>
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 bg-white border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
            type="text"
            placeholder="ex: torvalds"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            onClick={handleSearch}
            disabled={!username.trim()}
            className="bg-zinc-900 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg px-5 py-2.5 transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </main>
  );
}
