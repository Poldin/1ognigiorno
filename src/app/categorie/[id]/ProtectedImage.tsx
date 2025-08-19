"use client";

import Image from "next/image";

interface ProtectedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProtectedImage({ src, alt, className = "object-cover select-none pointer-events-none" }: ProtectedImageProps) {
  return (
    <>
      <Image 
        src={src} 
        alt={alt} 
        fill 
        className={className}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
      {/* Watermark */}
      <div className="absolute top-2 left-2 text-gray-400/60 text-xs font-medium z-10">
        ilPDG
      </div>
    </>
  );
}
