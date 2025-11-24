import Link from "next/link";
import { notFound } from "next/navigation";
import { Code } from "lucide-react";
import { getServiceById, LucideIcons } from "@/src/lib/services-data";
import { Button } from "@/src/components/ui/button";

interface ServiceDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const service = getServiceById(params.id);

  if (!service) {
    notFound(); // Render 404 page if service not found
  }

  const IconComponent = LucideIcons[service.icon];

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
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <Button
            variant="outline"
            className="mb-8 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground transition-colors"
          >
            <Link href="/services">← Back to Services</Link>
          </Button>

          <div className="text-center mb-12">
            {IconComponent && (
              <IconComponent className="h-16 w-16 text-accent-primary mx-auto mb-6" />
            )}
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
              {service.title}
            </h1>
            <p className="text-muted-foreground md:text-xl">
              {service.shortDescription}
            </p>
          </div>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>{service.longDescription}</p>
            {/* You can add more sections here like "My Approach", "Why Choose Me", etc. */}
            <p>
              If you're interested in this service or have a specific project in
              mind, feel free to{" "}
              <Link
                href="/#contact"
                className="text-accent-primary hover:underline"
              >
                contact me
              </Link>{" "}
              to discuss your needs.
            </p>
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
