"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // O tema já foi aplicado pelo script anti-FOUC no layout; aqui só
  // sincronizamos o estado do botão com a classe presente no <html>.
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage indisponível (modo privado etc.) — ignora.
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Alternar tema"
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition"
    >
      {/* Evita mismatch de hidratação: só mostra o ícone após montar. */}
      {mounted &&
        (isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
    </button>
  );
}
