"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkItem = { href: string; label: string };

export default function MobileMenuClient({ links }: { links: LinkItem[] }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={menuRef} className="">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-md p-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/10 dark:focus:ring-white/10"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          {open ? (
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div id="mobile-menu" className={`md:hidden ${open ? "block" : "hidden"} border-t border-black/5 bg-white/95 dark:bg-black/80`}>
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-1">
            {links.map((l) => {
              const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                    isActive ? "bg-black/5 dark:bg-white/5" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
