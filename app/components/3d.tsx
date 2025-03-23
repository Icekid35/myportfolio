"use client"
import React from "react";
import  "@google/model-viewer/lib/model-viewer";

const Model = () => {

  const glbSrc = "/models/avater.glb";

  return (
   <model-viewer src={glbSrc} ar ar-modes="webxr scene-viewer quick-look" className=" h-full w-full " camera-controls tone-mapping="neutral" poster="/images/poster.webp" shadow-intensity="1" auto-rotate>
    <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
    </div>
    <button slot="ar-button" id="ar-button">
        View in your space
    </button>
    
    <div id="ar-prompt"  >
        <img src="https://modelviewer.dev/shared-assets/icons/hand.png"    />
    </div>
</model-viewer>

  );
};

export default Model;