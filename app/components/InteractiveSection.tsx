"use client";

import { useId, useState } from "react";

type InteractiveSectionProps = {
  title: string;
  summary: string;
  details: string;
  align: "left" | "right";
};

export function InteractiveSection({ title, summary, details, align }: InteractiveSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  const alignmentClasses =
    align === "left"
      ? "md:self-start md:items-start md:text-left"
      : "md:self-end md:items-end md:text-right";

  const detailVisibilityClasses = isOpen
    ? "max-h-80 opacity-100"
    : "max-h-0 opacity-0";

  return (
    <section
      className={`group relative flex w-full flex-col gap-4 rounded-3xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg md:w-4/5 lg:w-3/5 ${alignmentClasses}`}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Featured</p>
          <h2 className="text-2xl font-semibold text-zinc-900">{title}</h2>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-400 md:hidden"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span className="sr-only">Toggle {title} details</span>
        </button>
      </div>
      <p className="text-base text-zinc-700">{summary}</p>
      <div
        id={contentId}
        className={`overflow-hidden text-sm leading-relaxed text-zinc-600 transition-all duration-500 ease-out ${detailVisibilityClasses} md:max-h-0 md:opacity-0 md:group-hover:max-h-80 md:group-hover:opacity-100`}
      >
        <p>{details}</p>
      </div>
    </section>
  );
}
