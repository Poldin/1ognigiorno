"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DescriptionToggleProps {
  children: React.ReactNode;
}

export default function DescriptionToggle({ children }: DescriptionToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-none">
      <div 
        className={`prose prose-invert text-justify transition-all duration-300 overflow-hidden ${
          isExpanded ? '' : 'line-clamp-3'
        }`}
      >
        {children}
      </div>
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 mt-3 text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium"
      >
        <span>{isExpanded ? 'Mostra meno' : 'Leggi tutto'}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
