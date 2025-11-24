import Link from "next/link";
import { LucideIcons } from "../lib/services-data";
import { Card, CardDescription, CardTitle } from "./ui/card";

interface ServiceCardProps {
  id: string;
  title: string;
  shortDescription: string;
  icon: keyof typeof LucideIcons;
}

export function ServiceCard({
  id,
  title,
  shortDescription,
  icon: IconName,
}: ServiceCardProps) {
  const IconComponent = LucideIcons[IconName];

  return (
    <Link href={`/services/${id}`} className="block">
      <Card className="bg-card border-border text-center p-6 flex flex-col items-center justify-center h-full hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
        {IconComponent && (
          <IconComponent className="h-10 w-10 text-accent-primary mb-4" />
        )}
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription className="text-muted-foreground flex-grow">
          {shortDescription}
        </CardDescription>
      </Card>
    </Link>
  );
}
