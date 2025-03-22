"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";

// Model Component
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const [adjusted, setAdjusted] = useState(false);

  useEffect(() => {
    if (scene && !adjusted) {
      // Compute bounding box
      const box = new Box3().setFromObject(scene);
      const size = new Vector3();
      box.getSize(size);

      scene.scale.set(5.5, 5.5, 5.5);

      // Recalculate bounding box after scaling
      box.setFromObject(scene);
      const boxBottom = box.min.y * 9;

      // Shift the model so its bottom aligns with y = 0
      scene.position.y -= boxBottom;

      setAdjusted(true);
    }
  }, [scene, adjusted]);

  return <primitive object={scene} />;
};

// Viewer Component
const GLBViewer = () => {
  return (
    <div className="w-full h-[500px] flex justify-center items-end">
      <Canvas camera={{ position: [0, 3, 8] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Model url="/models/avater.glb" />
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate enablePan autoRotate autoRotateSpeed={1.0} />
      </Canvas>
    </div>
  );
};

export default GLBViewer;
