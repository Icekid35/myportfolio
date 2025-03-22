"use client"
import React, { useEffect, useState } from "react";
const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulating loading completion
    const timer = setTimeout(() => setIsVisible(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-gray-10)] z-100">
      <div className="w-12 h-12 bg-[var(--color-loader)] rounded-full animate-ping"></div>
    </div>
  );
};

export default Preloader;