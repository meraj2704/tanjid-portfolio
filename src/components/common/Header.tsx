import Link from "next/link";
import { Code } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Code className="h-6 w-6 text-accent-primary" />
        <span className="text-lg font-semibold">DevPortfolio</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#about"
          className="text-sm font-medium hover:text-accent-primary transition-colors"
        >
          About
        </Link>
        <Link
          href="#skills"
          className="text-sm font-medium hover:text-accent-primary transition-colors"
        >
          Skills
        </Link>
        <Link
          href="/projects"
          className="text-sm font-medium hover:text-accent-primary transition-colors"
        >
          Projects
        </Link>
        <Link
          href="/services"
          className="text-sm font-medium hover:text-accent-primary transition-colors"
        >
          Services
        </Link>
        <Link
          href="#contact"
          className="text-sm font-medium hover:text-accent-primary transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
