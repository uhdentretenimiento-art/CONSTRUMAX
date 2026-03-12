"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

type Props = {
  currentProjectId: string;
  limit?: number;
};

export default function ProjectSuggestions({ currentProjectId, limit = 5 }: Props) {
  const candidates = useMemo(
    () => projects.filter((project) => project.id !== currentProjectId),
    [currentProjectId]
  );

  const [items, setItems] = useState(() => candidates.slice(0, limit));

  useEffect(() => {
    const shuffled = [...candidates];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setItems(shuffled.slice(0, limit));
  }, [candidates, limit]);

  return (
    <aside className="rounded-3xl border border-white/12 bg-white/[0.04] p-4 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.85)] backdrop-blur-xl md:p-5">
      <h3 className="font-display text-lg font-bold text-white md:text-xl">
        Proyectos similares
      </h3>

      <ul className="mt-4 space-y-2">
        {items.map((project) => (
          <li key={project.id}>
            <Link
              href={`/proyectos/${encodeURIComponent(project.id)}`}
              className="group inline-flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
            >
              <span aria-hidden="true" className="text-[#2DD4BF]">
                →
              </span>
              <span className="line-clamp-1">{project.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
