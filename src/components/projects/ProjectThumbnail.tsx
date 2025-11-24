"use client";

import Image from "next/image";
import { CarouselApi } from "../ui/carousel";

interface ProjectThumbnailsProps {
  images: string[];
  title: string;
  api: CarouselApi | undefined;
  current: number;
}

export function ProjectThumbnails({
  images,
  title,
  api,
  current,
}: ProjectThumbnailsProps) {
  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="mb-12 max-w-4xl mx-auto grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
      {images.map((image, index) => (
        <button
          key={`thumb-${index}`}
          onClick={() => handleThumbnailClick(index)}
          className={`relative block w-full aspect-video rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${
            index === current
              ? "ring-2 ring-accent-primary ring-offset-2 ring-offset-background"
              : "hover:opacity-75"
          }`}
          aria-label={`Show image ${index + 1}`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Thumbnail for ${title} image ${index + 1}`}
            fill
            className="object-cover"
          />
        </button>
      ))}
    </div>
  );
}
