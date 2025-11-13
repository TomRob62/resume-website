import Link from "next/link";
import MobileMenuClient from "./MobileMenuClient";

type LinkItem = { href: string; label: string };

const links: LinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  return (
    <nav className="w-full border-b border-black/5 bg-white/80 backdrop-blur dark:bg-black/70 dark:border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold">
            Resume
          </Link>
        </div>

        {/* Desktop links - server-rendered for minimal client JS */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu is a small client-only component */}
        <div className="md:hidden">
          <MobileMenuClient links={links} />
        </div>
      </div>
    </nav>
  );
}
