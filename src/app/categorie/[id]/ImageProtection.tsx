"use client";

import { useEffect } from "react";

export default function ImageProtection() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Blocca Ctrl+S, Ctrl+Shift+S, F12 (dev tools)
      if ((e.ctrlKey && e.key === 's') || 
          (e.ctrlKey && e.shiftKey && e.key === 'S') ||
          e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      // Blocca click destro su immagini
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null; // This component doesn't render anything
}
