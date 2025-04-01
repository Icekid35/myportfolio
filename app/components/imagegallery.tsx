"use client"
import React from "react";
import ImageGallery from "react-image-gallery";

import images from "./images";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Slider() {

  return (
    <section id="gallery" className="py-16 text-white container p-3">
                <h2 className="text-lg text-gray-400 text-center uppercase tracking-widest">My Gallery</h2>
      <ImageGallery
        items={images}
        autoPlay
        infinite
        lazyLoad
useTranslate3D
      />
    </section>
  );
}
