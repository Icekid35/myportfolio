"use client";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

type GalleryImage = {
  original: string;
  thumbnail: string;
  description?: string;
};

const fallbackImages: GalleryImage[] = [
  { original: "/me/me.jpg", thumbnail: "/me/me.jpg" },
  { original: "/me/profile.JPG", thumbnail: "/me/profile.JPG" },
  { original: "/me/profile2.JPG", thumbnail: "/me/profile2.JPG" },
  { original: "/me/profile3.jpg", thumbnail: "/me/profile3.jpg" },
  { original: "/me/profile4.jpg", thumbnail: "/me/profile4.jpg" },
  { original: "/me/profile5.JPG", thumbnail: "/me/profile5.JPG" },
];

export default function Slider() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setImages(
            data.map(
              (img: {
                original: string;
                thumbnail: string;
                caption?: string;
              }) => ({
                original: img.original,
                thumbnail: img.thumbnail,
                description: img.caption || undefined,
              }),
            ),
          );
        } else {
          setImages(fallbackImages);
        }
        setLoading(false);
      })
      .catch(() => {
        setImages(fallbackImages);
        setLoading(false);
      });
  }, []);

  return (
    <section id="gallery" className="py-16 text-white container p-3">
      <h2 className="text-lg text-gray-400 text-center uppercase tracking-widest">
        My Gallery
      </h2>
      {loading ? (
        <div className="w-full aspect-video bg-gray-800 animate-pulse rounded-xl mt-6" />
      ) : (
        <ImageGallery
          items={images}
          autoPlay
          infinite
          lazyLoad
          useTranslate3D
        />
      )}
    </section>
  );
}
