"use client";

import Link from "next/link";
import { HelpCircle, SquareChartGantt, Calendar } from "lucide-react";
import { trackButtonClick } from "../lib/gtag";

type CtaLinksProps = {
  variant?: "light" | "dark";
  contextLabel?: string;
};

export default function CtaLinks({ variant = "light", contextLabel = "Footer" }: CtaLinksProps) {
  const baseContainer = "mb-4 flex justify-center gap-3";
  const linkColor =
    variant === "dark"
      ? "text-gray-300 hover:text-white"
      : "text-gray-700 hover:text-black";

  return (
    <div className={baseContainer}>
      <Link
        href="/prodotti"
        onClick={() => trackButtonClick("Prodotti", contextLabel)}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${linkColor}`}
      >
        <SquareChartGantt className="w-4 h-4 mr-1" /> Prodotti
      </Link>
      <Link
        href="/how"
        onClick={() => trackButtonClick("Come funziona", contextLabel)}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${linkColor}`}
      >
        <HelpCircle className="w-4 h-4 mr-1" /> Scopri
      </Link>
      <Link
        href="/calendario"
        onClick={() => trackButtonClick("Calendario", contextLabel)}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${linkColor}`}
      >
        <Calendar className="w-4 h-4 mr-1" /> Calendario
      </Link>
    </div>
  );
}


