"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  thumbSrc?: string;
  largeSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export default function ProfileImageClient({
  src,
  thumbSrc,
  largeSrc,
  alt = "Profile image",
  width = 160,
  height = 240,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [prefetched, setPrefetched] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const thumb = thumbSrc ?? src;
  const large = largeSrc ?? src;

  const toggle = () => setExpanded((current) => !current);
  const close = () => setExpanded(false);

  const prefetchLarge = () => {
    if (prefetched) return;
    try {
      const img = new window.Image();
      img.src = large;
      setPrefetched(true);
    } catch {
      // best-effort
    }
  };

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!expanded) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (expanded) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <>
      <div ref={rootRef} className="relative flex items-center justify-center">
        <button
          type="button"
          aria-pressed={expanded}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse profile image" : "Expand profile image"}
          onClick={() => {
            prefetchLarge();
            toggle();
          }}
          onPointerEnter={prefetchLarge}
          onTouchStart={prefetchLarge}
          className="group relative block cursor-pointer overflow-visible rounded-[1.5rem] p-[3px] text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/70"
        >
          <span
            className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90"
            aria-hidden="true"
          />
          <span className="relative block h-56 w-44 overflow-hidden rounded-[1.2rem] bg-slate-900/40 shadow-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]">
            <Image
              src={thumb}
              alt={alt}
              width={width}
              height={height}
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 60vw, 176px"
              priority
              unoptimized
            />
          </span>
        </button>
      </div>

      {/* Unified overlay/modal for both desktop and mobile */}
      {expanded ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          onClick={close}
        >
          <div className="relative z-10 mx-auto max-h-[90vh] w-full max-w-[min(90vw,820px)]">
            <button
              className="absolute -top-3 -right-3 z-20 rounded-full bg-slate-800/80 p-2 text-slate-100 hover:bg-slate-800/95"
              onClick={close}
              aria-label="Close image"
            >
              ✕
            </button>

            <button
              type="button"
              onClick={close}
              className="block overflow-hidden rounded-3xl bg-slate-950/60 shadow-2xl transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/70"
            >
              <Image
                src={large}
                alt={alt}
                width={800}
                height={1200}
                className="block h-auto w-full max-h-[80vh] object-cover"
                loading="lazy"
                quality={88}
                unoptimized
              />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
