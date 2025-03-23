"use client";

import React, { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3 } from "three";

// Model Component
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene) {
      // Apply a uniform scale
      const scale = 5.5;
      scene.scale.set(scale, scale, scale);

      // Calculate the bounding box of the scene
      const box = new Box3().setFromObject(scene);
      // Compute how much to move the model so its bottom aligns with Y=0.
      const yOffset = -box.min.y * (scale-1.2);
      scene.position.y += yOffset;
    }
  }, [scene]);

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
        <OrbitControls
          enableZoom={false}
          enableRotate
          enablePan
          autoRotate
          autoRotateSpeed={1.0}
        />
      </Canvas>
    </div>
  );
};

export default GLBViewer;
