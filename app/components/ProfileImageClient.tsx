"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

const subscribeToDesktopLayout = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  const handler = () => callback();

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }

  const legacyHandler: MediaQueryListListener = () => callback();
  mediaQuery.addListener(legacyHandler);
  return () => mediaQuery.removeListener(legacyHandler);
};

const getDesktopSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
};

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
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopLayout,
    getDesktopSnapshot,
    () => false,
  );
  const [prefetched, setPrefetched] = useState(false);

  const toggle = () => setExpanded((current) => !current);
  const close = () => setExpanded(false);

  // ref for the thumbnail container to handle outside clicks on desktop
  const rootRef = useRef<HTMLDivElement | null>(null);

  const thumb = thumbSrc ?? src;
  const large = largeSrc ?? src;

  const prefetchLarge = () => {
    if (prefetched) return;
    try {
      const img = new window.Image();
      img.src = large;
      setPrefetched(true);
    } catch {
      // ignore – best effort hint for the browser cache.
    }
  };

  // Lock body scroll when the modal is active on mobile.
  useEffect(() => {
    if (!(expanded && !isDesktop)) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded, isDesktop]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (expanded) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  // close when clicking outside the thumbnail/expanded container on desktop for graceful dismissal
  useEffect(() => {
    if (!(expanded && isDesktop)) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [expanded, isDesktop]);

  return (
    <>
      {/* Inline tappable image (always in-flow, no layout shift until opened) */}
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
          <span className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />
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
            <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-100 shadow-lg">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
              Open to new opportunities
            </span>
          </span>
        </button>

        {/* Desktop expanding portrait (overlaps layout without shifting siblings) */}
        {isDesktop && expanded ? (
          <div
            className="pointer-events-auto absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
            aria-live="polite"
          >
            <button
              type="button"
              onClick={close}
              className="group relative block overflow-hidden rounded-[2rem] bg-slate-900/80 shadow-[0_40px_120px_rgba(59,130,246,0.55)] ring-4 ring-blue-300/40"
            >
              <Image
                src={large}
                alt={alt}
                width={420}
                height={560}
                className="block h-auto w-[min(55vw,420px)] max-w-[420px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                loading="lazy"
                quality={90}
                unoptimized
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-6 py-4 text-left text-base font-medium text-slate-100">
                Crafting thoughtful experiences
              </span>
            </button>
          </div>
        ) : null}
      </div>

      {/* Overlay modal for expanded state on mobile only. Renders on top of everything and uses opacity+scale for smooth animation. */}
      {expanded && !isDesktop ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          onClick={close}
        >
          {/* Centered image wrapper */}
          <div className="relative z-10 mx-auto max-h-[90vh] w-full max-w-sm">
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
                className="block h-auto w-full max-h-[70vh] object-cover"
                loading="lazy"
                quality={88}
                unoptimized
              />
              <span className="block bg-slate-950/70 px-6 py-3 text-center text-sm font-semibold text-slate-100">
                Tap image to return to thumbnail
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
