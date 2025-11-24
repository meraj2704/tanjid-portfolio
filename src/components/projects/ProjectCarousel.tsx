"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/src/components/ui/carousel";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  api?: CarouselApi;
  setApi: (api: CarouselApi) => void;
  setCurrent: (index: number) => void;
}

export function ProjectCarousel({
  images,
  title,
  api,
  setApi,
  setCurrent,
}: ProjectCarouselProps) {
  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api, setCurrent]);

  return (
    <Carousel setApi={setApi} className="mb-6">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
