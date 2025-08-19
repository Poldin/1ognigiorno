"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShareButton from "../../components/ShareButton";

interface CategoryActionsProps {
  shareData: {
    title: string;
    description: string;
  };
}

export default function CategoryActions({ shareData }: CategoryActionsProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Link
        href="/prodotti"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>indietro</span>
      </Link>
      <ShareButton shareData={shareData} />
    </div>
  );
}
