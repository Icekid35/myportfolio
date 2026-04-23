"use client";
import React from "react";
import "@google/model-viewer/lib/model-viewer";

const Model = () => {
  const glbSrc = "/models/compressed.glb";

  return (
    <model-viewer
      src={glbSrc}
      ar
      ar-modes="webxr scene-viewer quick-look"
      className=" h-full w-full "
      camera-controls
      tone-mapping="neutral"
      poster="/images/poster.webp"
      loading="eager"
      reveal="auto"
      style={{
        backgroundColor: "var(--color-body)",
      }}
      shadow-intensity="1"
      auto-rotate
    ></model-viewer>
  );
};

export default Model;
