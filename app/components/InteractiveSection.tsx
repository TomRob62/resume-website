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

  // Allow the details panel to grow freely on mobile when opened
  const detailVisibilityClasses = isOpen
    ? "max-h-none opacity-100"
    : "max-h-0 opacity-0";

  return (
    <section
      className={`group relative flex w-full flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 shadow-lg shadow-black/40 backdrop-blur-sm transition-transform transition-colors duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-blue-500/20 md:w-4/5 lg:w-3/5 ${alignmentClasses}`}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">{title}</p>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/60 text-slate-200 transition-colors hover:border-blue-500/60 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14] md:hidden"
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
      <p className="mt-2 text-base font-medium text-slate-100">{summary}</p>
      <div
        id={contentId}
        className={`overflow-hidden text-sm leading-relaxed text-slate-300 transition-all duration-500 ease-out ${detailVisibilityClasses} md:max-h-0 md:opacity-0 md:group-hover:max-h-80 md:group-hover:opacity-100`}
      >
        <p>{details}</p>
      </div>
    </section>
  );
}
