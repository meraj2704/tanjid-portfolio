import Link from "next/link";
import { Code } from "lucide-react";
import { ServiceCard } from "@/src/components/service-card";
import { getAllServicesData } from "@/src/lib/services-data";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Code className="h-6 w-6 text-accent-primary" />
          <span className="text-lg font-semibold">DevPortfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/#about"
            className="text-sm font-medium hover:text-accent-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/#skills"
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
            href="/#contact"
            className="text-sm font-medium hover:text-accent-primary transition-colors"
          >
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            My Services
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-center mb-12">
            I offer a range of specialized development services to help bring
            your ideas to life.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {getAllServicesData()?.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                shortDescription={service.shortDescription}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} John Doe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/#about"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground"
          >
            Projects
          </Link>
          <Link
            href="/services"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground"
          >
            Services
          </Link>
          <Link
            href="/#contact"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
