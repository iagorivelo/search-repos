"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() !== "") {
      router.push(`/repositorio/${value}`);
    }
  };

  return (
    <main className="bg-black/90 min-h-screen p-24 flex flex-col justify-center gap-4">
      <h1 className="text-white text-center font-bold text-2xl rounded p-2">
        Pesquisar Repositórios
      </h1>
      <input
        className="outline-none font-bold text-white bg-indigo-600 rounded p-2 w-full"
        type="text"
        placeholder="example: iagorivelo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </main>
  );
}
