"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

type ImageCarouselProps = {
  images: string[];
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [mainApi, setMainApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(0);

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="h-96 w-full aspect-square overflow-hidden"
        >
          <Image
            src={image}
            alt={`Carousel Main Image ${index + 1}`}
            fill
            style={{ objectFit: "contain" }}
          />
        </CarouselItem>
      )),
    [images]
  );

  const thumbnailImages = () =>
    images.map((image, index) => (
      <CarouselItem
        key={index}
        className="relative aspect-square w-full basis-1/4 cursor-pointer"
        onClick={() => handleClick(index)}
      >
        <Image
          className={`${index === current ? "border-2 rounded-xl border-accent/50" : ""}`}
          src={image}
          fill
          alt={`Carousel Thumbnail Image ${index + 1}`}
          style={{ objectFit: "contain" }}
        />
      </CarouselItem>
    ));

  useEffect(() => {
    if (!mainApi || !thumbnailApi) {
      return;
    }

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap();
      setCurrent(selected);
      thumbnailApi.scrollTo(selected);
    };

    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap();
      setCurrent(selected);
      mainApi.scrollTo(selected);
    };

    mainApi.on("select", handleTopSelect);
    thumbnailApi.on("select", handleBottomSelect);

    return () => {
      mainApi.off("select", handleTopSelect);
      thumbnailApi.off("select", handleBottomSelect);
    };
  }, [mainApi, thumbnailApi]);

  const handleClick = (index: number) => {
    if (!mainApi || !thumbnailApi) {
      return;
    }
    thumbnailApi.scrollTo(index);
    mainApi.scrollTo(index);
    setCurrent(index);
  };

  return (
    <div className="flex flex-col max-sm:w-full lg:w-[900px] w-[1400px] justify-center items-center">
      <Carousel setApi={setMainApi}>
        <CarouselContent className="m-1">{mainImage}</CarouselContent>
      </Carousel>
      <Carousel
        setApi={setThumbnailApi}
        opts={{
          direction: "rtl",
        }}
        className="w-full max-w-xs"
      >
        <CarouselContent className="m-1 gap-2">
          {thumbnailImages()}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
