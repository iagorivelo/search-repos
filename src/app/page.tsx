"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) router.push(`/repositorio/${encodeURIComponent(trimmed)}`);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary mb-4">
            <Search className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Search Repos
          </h1>
          <p className="text-sm text-muted-foreground">
            Procure por repositórios públicos de qualquer usuário do GitHub
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            type="text"
            placeholder="ex: torvalds"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            disabled={!username.trim()}
            className="bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground text-sm font-medium rounded-lg px-5 py-2.5 transition"
          >
            Buscar
          </button>
        </form>
      </div>
    </main>
  );
}
