import Link from "next/link";

interface Resource {
  name: string;
  url: string;
}

interface ProjectResourcesProps {
  resources?: Resource[];
}

export function ProjectResources({ resources }: ProjectResourcesProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Resources</h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        {resources.map((resource, index) => (
          <li key={index}>
            <Link
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-primary underline-offset-4 hover:underline"
            >
              {resource.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
