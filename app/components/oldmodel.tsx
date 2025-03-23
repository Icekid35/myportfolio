"use client";

import React, { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";

// Model Component
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (!scene) return;
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3()); 
    const scaleFactor = (5 / Math.max(size.x, size.y, size.z))*2; 

    scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

    const yOffset = -box.min.y * scaleFactor;
    scene.position.y += yOffset;
  }, [scene]);

  return <primitive object={scene} />;
};

// Viewer Component
const GLBViewer = () => {
  return (
    <div className="w-full h-full flex justify-center items-end overflow-auto touch-auto">
      <Canvas camera={{ position: [0, 2, 3], fov: 50 }}>
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
