"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to cover page by default
    router.replace('/admin/manage_products/cover');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Reindirizzamento...</p>
      </div>
    </div>
  );
}