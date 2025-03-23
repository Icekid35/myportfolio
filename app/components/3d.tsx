"use client"
import React from "react";
import  "@google/model-viewer/lib/model-viewer";

const Model = () => {

  const glbSrc = "/models/avater.glb";

  return (
   <model-viewer src={glbSrc} ar ar-modes="webxr scene-viewer quick-look" className=" h-full w-full " camera-controls tone-mapping="neutral" poster="/images/poster.webp" shadow-intensity="1" auto-rotate>

</model-viewer>

  );
};

export default Model;