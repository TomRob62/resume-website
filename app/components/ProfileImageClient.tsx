"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false); // used to trigger enter animation for modal
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefetched, setPrefetched] = useState(false);

  const open = () => setExpanded(true);
  const close = () => setExpanded(false);

  const thumb = thumbSrc ?? src;
  const large = largeSrc ?? src;

  const prefetchLarge = () => {
    if (prefetched) return;
    try {
      const img = new window.Image();
      img.src = large;
      setPrefetched(true);
    } catch (e) {
      // ignore
    }
  };

  // detect desktop vs mobile using matchMedia (Tailwind `md` breakpoint ~768px)
  useEffect(() => {
    const mm = window.matchMedia("(min-width: 768px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop((e as any).matches);
    handle(mm);
    if (mm.addEventListener) mm.addEventListener("change", handle as any);
    else mm.addListener(handle as any);
    return () => {
      if (mm.removeEventListener) mm.removeEventListener("change", handle as any);
      else mm.removeListener(handle as any);
    };
  }, []);

  // When opening a modal (mobile), set mounted true and lock body scroll. For desktop inline expand we don't lock body.
  useEffect(() => {
    if (expanded && !isDesktop) {
      setMounted(true);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        setMounted(false);
      };
    } else {
      setMounted(false);
    }
  }, [expanded, isDesktop]);

  // close on Escape (only relevant for modal/mobile)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (expanded && !isDesktop) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded, isDesktop]);

  // If the breakpoint changes while expanded, close to avoid inconsistent UI
  useEffect(() => {
    // if user resizes from desktop->mobile or vice-versa while image expanded, close it
    const onResize = () => {
      if (expanded) setExpanded(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [expanded]);

  return (
    <>
      {/* Inline tappable image (always in-flow, no layout shift until opened) */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={expanded}
        aria-label={expanded ? "Collapse profile image" : "Expand profile image"}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        }}
        onMouseEnter={prefetchLarge}
        onTouchStart={prefetchLarge}
        className="relative cursor-pointer"
      >
        <div className="overflow-hidden rounded-2xl shadow-xl shadow-blue-500/30 ring-2 ring-blue-500/40 transition-transform duration-200 ease-out h-52 w-40 hover:-translate-y-1 hover:scale-[1.02]">
          <Image
            src={thumb}
            alt={alt}
            width={width}
            height={height}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 40vw, 160px"
            unoptimized
          />
        </div>
      </div>

      {/* Overlay modal for expanded state on mobile only. Renders on top of everything and uses opacity+scale for smooth animation. */}
      {expanded && !isDesktop ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          aria-modal="true"
          role="dialog"
          onClick={close}
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`} />

          {/* Centered image wrapper */}
          <div
            className={`relative z-10 mx-4 max-h-[90vh] max-w-[90vw] transition-transform duration-300 ${
              mounted ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-3 -right-3 z-20 rounded-full bg-slate-800/80 p-2 text-slate-100 hover:bg-slate-800/95"
              onClick={close}
              aria-label="Close image"
            >
              ✕
            </button>

            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={large}
                alt={alt}
                width={800}
                height={1200}
                className="block h-auto w-full object-cover"
                loading="lazy"
                quality={85}
                unoptimized
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
